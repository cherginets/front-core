import {useFormikContext} from "formik";
import moment from "moment/moment";
import {Button, ButtonProps, Stack, TextField, Typography} from "@mui/material";
import {FormikDateTimeFieldProps} from "@/core/formik/fields/FormikDateTimeField";
import {TextFieldProps} from "@mui/material/TextField";

export default function FormikDateField({label, name, ...props}: {
  name: string;
  label: string;
} & Omit<TextFieldProps, 'name' | 'label'>) {
  const formik = useFormikContext<any>();

  const momentValue = moment(formik.values[name]);

  const value = momentValue.isValid() ? momentValue.format("YYYY-MM-DD") : "";

  const disabled = formik.isSubmitting;

  const buttonProps: Partial<ButtonProps> = {
    disabled,
    size: "small",
    style: {padding: 0},
    variant: "outlined",
  };

  return (
    <Stack direction={"column"} spacing={1}>
      <TextField
        label={label}
        type="date"
        name="meeting-time"
        // value="2018-06-12T19:30"
        value={value}
        disabled={disabled}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        {...props}
      />
    </Stack>
  );
}