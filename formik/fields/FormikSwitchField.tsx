import {FormHelperText, Switch} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import {useFormikContext} from "formik";

export type FormikSwitchFieldProps = {
  label: string;
  name: string;
  disabled?: boolean;
};
export default function FormikSwitchField({label, name, disabled, ...props}: FormikSwitchFieldProps) {
  const formik = useFormikContext<{[key: string]: any}>();

  const helperText = (formik.touched[name] && formik.errors[name]) as string;

  const {value: checked} = formik.getFieldProps(name)

  return (
    <FormGroup onBlur={formik.handleBlur}>
      <FormControlLabel
        onBlur={formik.handleBlur}
        disabled={disabled}
        control={
          <Switch
            name={name}
            checked={checked}
            onChange={(_, checked) => {
              formik.setFieldValue(name, checked)
            }}
          />
        }
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormGroup>
  );
}
