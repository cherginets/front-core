import { n_error } from "@/core/features/notifications";
import IconButton from "@/core/mui/IconButton";
import { formatError } from "@/core/utils";
import { Sync } from "@mui/icons-material";
import {
  MaterialReactTableProps,
  MRT_RowData,
  MRT_TableOptions,
  MaterialReactTable as OriginalMaterialReactTable,
  useMaterialReactTable as useOriginalMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { useEffect } from "react";

export function MRTable<TData extends MRT_RowData>(
  props: MaterialReactTableProps<TData>,
) {
  return <OriginalMaterialReactTable {...props} />;
}

export function useMRTable<TData extends MRT_RowData>({
  error,
  refetch,
  renderTopToolbarCustomActions,
  ...tableOptions
}: MRT_TableOptions<TData> & {
  refetch?: () => any;
  error?: any;
}) {
  useEffect(() => {
    if (error) n_error(formatError(error));
  }, [error]);
  return useOriginalMaterialReactTable({
    ...tableOptions,
    localization: MRT_Localization_RU,
    enableDensityToggle: false,
    renderTopToolbarCustomActions: (...props) => {
      return (
        <>
          {!!renderTopToolbarCustomActions &&
            renderTopToolbarCustomActions(...props)}
          <div style={{ marginLeft: "auto" }} />
          {!!refetch && (
            <IconButton
              style={{ marginRight: -8 }}
              title={"Обновить данные"}
              onClick={() => {
                refetch();
              }}
            >
              <Sync />
            </IconButton>
          )}
        </>
      );
    },
  });
}
