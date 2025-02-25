import {useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {TextField} from "@mui/material";

export const MRTFilterString:MRT_ColumnDef<any>['Filter'] = ({ column }) => {
  console.log('column', column);
  const [filterValue, setFilterValue] = useState<string>(column.getFilterValue() as string || '');

  return (
    <TextField
      variant={'standard'}
      value={filterValue}
      fullWidth
      placeholder={`Фильтр по ${column.columnDef.header}`}
      onChange={(e) => setFilterValue(e.target.value)}
      onBlur={() => column.setFilterValue(filterValue)} // Применение фильтра при onBlur
    />
  );
}