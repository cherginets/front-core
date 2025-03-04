import {NextLink} from "@/core/components/NextMuiLink";
import {n_promise} from "@/core/features/notifications";
import moment from "moment";
import {MOMENT_DATE_PRETTY} from "@/core/utils";
import {OpenInNew, ToggleOff, ToggleOn} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {MRT_Cell, MRT_ColumnDef, MRT_Row, MRT_RowData} from "material-react-table";
import Link from "next/link";

export const MRTColumns_id = function <T extends MRT_RowData = MRT_RowData>({
  getRowLink = () => null,
}: {
  getRowLink?: (props: {cell: MRT_Cell<T, any>; row: MRT_Row<T>}) => string | null;
} = {}): MRT_ColumnDef<T, any> {
  return {
    accessorKey: "id",
    header: "ID",
    size: 0,
    filterVariant: "range",
    // enableClickToCopy: true,
    enableEditing: false,
    enableSorting: true,
    Cell: ({row, cell}) => {
      const link = getRowLink({row, cell});
      if (link)
        return (
          <Link className={"link"} href={link}>
            {cell.getValue()}
          </Link>
        );
      return cell.getValue();
    },
  };
};

export const MRTColumns_active = function <T extends MRT_RowData = MRT_RowData>({
  onToggle,
}: {
  onToggle?: ({row}: {row: MRT_Row<T>}) => Promise<any>;
}): MRT_ColumnDef<T, any> {
  return {
    accessorKey: "active",
    header: "Акт.",
    size: 0,
    enableEditing: false,
    enableSorting: false,
    enableColumnFilter: true,
    filterVariant: "checkbox",
    enableGlobalFilter: false,
    Cell: ({row}) => {
      const active = row.original["active"];
      const IconComponent = active ? ToggleOn : ToggleOff;
      const color = active ? "success" : "error";
      return (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (onToggle) {
              n_promise(onToggle({row}), {
                pending: "Смена активности",
              });
            }
          }}
        >
          <IconComponent color={color} />
        </IconButton>
      );
    },
  };
};

export const MRTColumns_link = function <T extends MRT_RowData = MRT_RowData>(
  getRowLink: (row: MRT_RowData) => string,
  options: {_blank?: boolean} = {}
): MRT_ColumnDef<T, any> {
  return {
    id: "link",
    header: "#",
    size: 0,
    enablePinning: true,
    Cell: ({row, table}: any) => {
      const href = getRowLink(row);
      return (
        <NextLink href={href} target={options._blank ? "_blank" : undefined}>
          <IconButton sx={{p: "0 5px"}} size={"small"}>
            <OpenInNew fontSize={"small"} />
          </IconButton>
        </NextLink>
      );
    },
  };
};

const MRTColumns_date = (): Pick<MRT_ColumnDef<any>, "size" | "Cell" | "enableColumnFilter"> => ({
  size: 0,
  enableColumnFilter: false,
  // filterVariant: "date-range",
  Cell: ({row}: any) => moment(row.original.created_at).format(MOMENT_DATE_PRETTY),
});

export const MRTColumns_updated_at = (): MRT_ColumnDef<any> => ({
  ...MRTColumns_date(),
  accessorKey: "updated_at",
  header: "Обновлено",
});

export const MRTColumns_created_at = (): MRT_ColumnDef<any> => ({
  ...MRTColumns_date(),
  accessorKey: "created_at",
  header: "Создано",
});
