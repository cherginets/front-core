import {Slider, SliderProps} from "@mui/material";
import {useField, useFormikContext} from "formik";

export default function FormikSliderField({name, label, ...props}: {label?: string, name: string} & SliderProps) {
  const formik  = useFormikContext()

  const {value} = formik.getFieldProps(name)

  return <div className={'flex flex-col'}>
    {label && <div className={'text-sm text-gray-500'}>{label}</div>}
    <Slider
      name={name}
      value={value}
      onChange={(e, value) => formik.setFieldValue(name, value)}
      {...props}
    />
  </div>
}