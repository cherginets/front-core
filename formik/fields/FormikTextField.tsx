import {isNumeric} from "@/core/utils/isNumeric";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import {useFormikContext} from "formik";

export type FormikTextFieldProps = Omit<TextFieldProps, "name"> & Required<Pick<TextFieldProps, "name">>;
export default function FormikTextField({name, helperText, type, ...props}: FormikTextFieldProps) {
  const formik = useFormikContext<any>();

  const onChange: TextFieldProps["onChange"] = (e) => {
    let newValue = null;
    if (type === "number") {
      if (e.target.value === "0") newValue = 0;
      else if (isNumeric(e.target.value)) newValue = Number(e.target.value);
      else newValue = null;
    } else {
      newValue = e.target.value || "";
    }

    formik.setFieldValue(name, newValue);
  };

  const {value} = formik.getFieldProps(name);

  return (
    <TextField
      fullWidth
      name={name}
      type={type}
      value={
        type === "number"
          ? value === 0
            ? "0"
            : value
              ? value
              : ""
          : value || ""
      }
      onChange={onChange}
      onBlur={formik.handleBlur}
      error={(formik.touched[name] || formik.submitCount > 0) && !!formik.errors[name]}
      // @ts-ignore
      helperText={(formik.touched[name] && formik.errors[name]) || helperText}
      disabled={formik.isSubmitting}
      margin={"dense"}
      {...props}
    />
  );
}
