import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import {Option} from "@/core/formik/types/options";

function Select<T>({label, value, options, onChange, ...props}: {
  label?: string
  value: string | number | null;
  options: Option<T>[]
  onChange: (value: T) => any
} & Omit<SelectProps, 'value' | 'onChange'>) {
  return <FormControl fullWidth>
    {label && <InputLabel>{label}</InputLabel>}
    <MuiSelect
      fullWidth
      value={value}
      label={label}
      onChange={(event, child) => onChange(event.target.value as any)}
      {...props}
    >
      {options.map(({label, value}) => <MenuItem value={value as string}>{label}</MenuItem>)}
    </MuiSelect>
  </FormControl>;
}

export default Select;