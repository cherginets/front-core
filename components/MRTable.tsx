import {AlertWithError} from "@/core/components/AlertWithError";
import IconButton from "@/core/mui/IconButton";
import {Sync} from "@mui/icons-material";
import {TypedUseQueryHookResult} from "@reduxjs/toolkit/query/react";
import {
  MaterialReactTableProps,
  MRT_Row,
  MRT_RowData,
  MRT_TableOptions,
  MaterialReactTable as OriginalMaterialReactTable,
  useMaterialReactTable as useOriginalMaterialReactTable,
} from "material-react-table";
import {MRT_Localization_RU} from "material-react-table/locales/ru";
import {useMemo} from "react";

export function MRTable<TData extends MRT_RowData>(props: MaterialReactTableProps<TData>) {
  return <OriginalMaterialReactTable {...props} />;
}

export function useMRTable<TData extends MRT_RowData>({
  error: _error,
  data: _data,
  refetch: _refetch,
  query,
  queryGetRows = (result) => result?.rows || [],
  queryGetTotal = (result) => result?.total || [],
  renderTopToolbarCustomActions,
  onRowClick,
  state: _state,
  ...tableOptions
}: Omit<MRT_TableOptions<TData>, "data"> &
  Pick<Partial<MRT_TableOptions<TData>>, "data"> & {
    refetch?: () => any;
    error?: any;
    query?: TypedUseQueryHookResult<any, void, any, any>;
    queryGetRows?: (result: any) => TData[];
    queryGetTotal?: (result: any) => number;
    onRowClick?: ({row}: {row: MRT_Row<TData>}) => any;
  }) {
  const state = useMemo(() => {
    return {
      isLoading: query && query?.isLoading,
      ..._state,
    };
  }, [_state, query]);

  const refetch = useMemo(() => {
    if (query) return query.refetch;
    return _refetch;
  }, [_refetch, query]);

  const error = useMemo(() => {
    if (query) return query.error;
    return _error;
  }, [query, _error]);

  // const error =

  const data = useMemo<TData[]>(() => {
    if (query) return queryGetRows(query.data);
    return _data || [];
  }, [_data, query, queryGetRows]);

  return useOriginalMaterialReactTable({
    ...tableOptions,
    state,
    data,
    localization: MRT_Localization_RU,
    enableDensityToggle: false,
    renderEmptyRowsFallback: () => {
      if (error) return <AlertWithError error={error} />;
    },
    renderTopToolbarCustomActions: (...props) => {
      return (
        <>
          {!!renderTopToolbarCustomActions && renderTopToolbarCustomActions(...props)}
          <div style={{marginLeft: "auto"}} />
          {!!refetch && (
            <IconButton
              style={{marginRight: -8}}
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

    muiTableBodyRowProps: !onRowClick
      ? undefined
      : ({row}) => ({
          onClick: () => onRowClick({row}),
          sx: {
            cursor: "pointer", //you might want to change the cursor too when adding an onClick
          },
        }),
  });
}
