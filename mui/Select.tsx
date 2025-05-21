import {Option} from "@/core/formik/types/options";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, {SelectProps as MuiSelectProps} from "@mui/material/Select";
import {useState} from "react";

export type SelectProps<T> = {
  className?: string;
  selectClassName?: string;
  label?: string;
  value: string | number | null;
  options: Option<T>[];
  onChange: (value: T) => any;
} & Omit<MuiSelectProps, "label" | "value" | "onChange">;

function Select<T>({className, selectClassName, variant, label, value, options, onChange, ...props}: SelectProps<T>) {

  return (
    <FormControl variant={variant} className={className} fullWidth>
      {label && <InputLabel  id="demo-simple-select-filled-label">{label}</InputLabel>}
      <MuiSelect
        className={selectClassName}
        labelId="demo-simple-select-filled-label"

        sx={{
          boxShadow: "none",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #484850",
            borderRadius: "5px 5px 0 0"
          },
        }}
        fullWidth
        disableUnderline
        value={value}
        label={label}
        variant={variant}
        onChange={(event, child) => onChange(event.target.value as any)}
        {...props}
      >
        {options.map(({label, value, disabled}, i) => (
          <MenuItem value={value as string} key={i} disabled={disabled}>{label}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default Select;
