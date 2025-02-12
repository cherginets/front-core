import {FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectProps as MuiSelectProps} from '@mui/material';
import {ReactNode} from "react";

export type SelectProps = {
  label: string
  options: {
    label: ReactNode
    value: string | number
  }[]
} & MuiSelectProps

export const Select = ({label, options, className, ...props}: SelectProps) => {
  return <FormControl variant="standard" className={className}>
    {label && <InputLabel>{label}</InputLabel>}
    <MuiSelect
      // value={age}
      // onChange={handleChange}
      label={label}
      fullWidth
      {...props}
    >
      {options.map(({label, value}) => {
        return <MenuItem value={value} key={value}>{label}</MenuItem>
      })}
      {/*<MenuItem value="">*/}
      {/*  <em>None</em>*/}
      {/*</MenuItem>*/}
      {/*<MenuItem value={10}>Ten</MenuItem>*/}
      {/*<MenuItem value={20}>Twenty</MenuItem>*/}
      {/*<MenuItem value={30}>Thirty</MenuItem>*/}
    </MuiSelect>
  </FormControl>;
}