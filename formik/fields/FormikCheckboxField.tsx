import {isNumeric} from "@/core/utils/isNumeric";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import {useField, useFormikContext} from "formik";
import {Checkbox} from "@mui/material";
import {ReactNode} from "react";

export type FormikCheckboxFieldProps = {
  name: string
  label: ReactNode
};
const FormikCheckboxField = ({ label, name, ...props }: FormikCheckboxFieldProps) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className={'flex flex-col gap-2'}>
      <label className="flex items-center gap-1 cursor-pointer">
        <Checkbox
          id={name}
          size={'medium'}
          checked={field.value}
          onChange={(event, checked) => helpers.setValue(checked)}
          {...props}
        />
        <div className={'inline text-left'}>{label}</div>

      </label>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-left">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default FormikCheckboxField;