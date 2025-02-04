"use client";

import {Button, ButtonProps, Stack, TextField, Typography} from "@mui/material";
import {useFormikContext} from "formik";
import moment from "@/core/moment";

export type FormikDateTimeFieldProps = {
  name: string;
  label: string;
  disableButtons?: boolean;
};
export default function FormikDateTimeField({label, name, disableButtons}: FormikDateTimeFieldProps) {
  const formik = useFormikContext<any>();

  const momentValue = moment(formik.values[name]);

  const value = momentValue.isValid() ? momentValue.format("YYYY-MM-DDTHH:mm") : "";

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
        type="datetime-local"
        name="meeting-time"
        // value="2018-06-12T19:30"
        value={value}
        disabled={disabled}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
      />
      {!disableButtons && (
        <Stack direction={"row"} spacing={0} justifyContent={"space-between"}>
          <Button
            {...buttonProps}
            onClick={() => {
              if (momentValue.isValid()) formik.setFieldValue(name, momentValue.add(1, "day"));
            }}
          >
            +1 дн
          </Button>
          <Button
            {...buttonProps}
            onClick={() => {
              if (momentValue.isValid()) formik.setFieldValue(name, momentValue.subtract(1, "day"));
            }}
          >
            -1 дн
          </Button>
          <Button
            {...buttonProps}
            onClick={() => {
              if (momentValue.isValid()) formik.setFieldValue(name, momentValue.add(30, "day"));
            }}
          >
            +30 дн
          </Button>
          <Button
            {...buttonProps}
            onClick={() => {
              if (momentValue.isValid()) formik.setFieldValue(name, momentValue.subtract(30, "day"));
            }}
          >
            -30 дн
          </Button>
        </Stack>
      )}
      {momentValue.isValid() && <Typography variant={"caption"}>{momentValue.fromNow()}</Typography>}
    </Stack>
  );
}
