import {MRTable, useMRTable, UseMRTableProps} from "@/core/components/MRTable";

export default function MRTableSimple({data, columns}: UseMRTableProps<any>) {
  const table = useMRTable({
    data,
    columns,
    enablePagination: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableSorting: false,
  });
  return <MRTable table={table} />;
}
