import {Slider, SliderProps, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps} from "@mui/material";
import {useField, useFormikContext} from "formik";
import {Option} from "@/core/formik/types/options";

export default function FormikToggleButtonsField({name, label, options, onChange, ...props}: {
  label?: string, name: string, options: Option[], onChange?: (value: any) => any} & Omit<ToggleButtonGroupProps, 'name' | 'value' | 'onChange'>) {
  const formik  = useFormikContext()

  const {value} = formik.getFieldProps(name)

  return <div className={'flex flex-col gap-2'}>
    {label && <div className={'text-sm text-gray-500'}>{label}</div>}
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={(event, value) => {
        formik.setFieldValue(name, value)
        if(onChange) onChange(value)
      }}
      {...props}
    >
      {options.map((opt) => <ToggleButton value={opt.value} key={opt.value}>{opt.label}</ToggleButton>)}
    </ToggleButtonGroup>
  </div>
}