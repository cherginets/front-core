import { Option } from "@/core/formik/types/options";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { useFormikContext } from "formik";
import { useMemo } from "react";

export type FormikSelectFieldProps = {
  helperText?: string;
  options: Option[];
  optionsMap?: Map<Option["value"], Option>;
} & Omit<SelectProps, "name"> &
  Required<Pick<SelectProps, "name">>;

export default function FormikSelectField({
  name,
  label,
  helperText: _helperText,
  options,
  optionsMap: _optionsMap,
                                            disabled,
  ...props
}: FormikSelectFieldProps) {
  const formik = useFormikContext<any>();

  const optionsMap = useMemo(() => _optionsMap || new Map(options.map((o) => [o.value, o])), [_optionsMap, options]);

  const labelId = `${name}-label`;
  const helperText = ((formik.touched[name] && formik.errors[name]) || _helperText) as string;

  return (
    <FormControl
      fullWidth
      disabled={formik.isSubmitting}
      error={(formik.touched[name] || formik.submitCount > 0) && !!formik.errors[name]}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={name}
        disabled={disabled}
        value={formik.values[name] || ""}
        label={label}
        onBlur={formik.handleBlur}
        onChange={(e) => formik.setFieldValue(name, e.target.value || null)}
      >
        {options.map((option, i) => (
          <MenuItem value={option.value} key={i}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
