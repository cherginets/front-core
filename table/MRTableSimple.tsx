import {MRTable, useMRTable, UseMRTableProps} from "@/core/components/MRTable";
import {MRT_RowData} from "material-react-table";

export default function MRTableSimple<T extends MRT_RowData = any>({data, columns}: UseMRTableProps<T>) {
    const table = useMRTable({data, columns})
    return <MRTable table={table} />
}