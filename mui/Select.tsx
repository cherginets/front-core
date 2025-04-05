import {Option} from "@/core/formik/types/options";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, {SelectProps as MuiSelectProps} from "@mui/material/Select";

export type SelectProps<T> = {
  label?: string;
  value: string | number | null;
  options: Option<T>[];
  onChange: (value: T) => any;
} & Omit<MuiSelectProps, "label" | "value" | "onChange">;

function Select<T>({label, value, options, onChange, ...props}: SelectProps<T>) {
  return (
    <FormControl fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect sx={{
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
          {
            border: 0,
          },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: 0,
          },
      }}
        fullWidth
                 disableUnderline
        value={value}
        label={label}
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
