import {
  MaterialReactTable as OriginalMaterialReactTable, MaterialReactTableProps, MRT_RowData, MRT_TableOptions,
  useMaterialReactTable as useOriginalMaterialReactTable
} from "material-react-table";
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import IconButton from "@/core/mui/IconButton";
import {Sync} from "@mui/icons-material";

export function MRTable<TData extends MRT_RowData>(props: MaterialReactTableProps<TData>) {
  return <OriginalMaterialReactTable {...props} />
}

export function useMRTable<TData extends MRT_RowData>({refetch, renderTopToolbarCustomActions, ...tableOptions}: MRT_TableOptions<TData> & {
  refetch?: () => any,
}) {
  return useOriginalMaterialReactTable({
    ...tableOptions,
    localization: MRT_Localization_RU,
    enableDensityToggle: false,
    renderTopToolbarCustomActions: (...props) => {
      return <>
        {!!renderTopToolbarCustomActions && renderTopToolbarCustomActions(...props)}
        <div style={{marginLeft: 'auto'}} />
        {!!refetch && <IconButton style={{marginRight: -8}} title={'Обновить данные'} onClick={() => {
          refetch()
        }}><Sync /></IconButton>}
      </>
    }
  })
}