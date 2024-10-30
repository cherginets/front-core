import { n_error } from "@/core/features/notifications";
import FormikSwitchField from "@/core/formik/fields/FormikSwitchField";
import { Option } from "@/core/formik/types/options";
import { Publish, RestartAlt } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Formik, FormikConfig } from "formik";
import { useMemo } from "react";
import {FormikTextField} from "@/core/formik";

export type FormikFormProps = {
  innerRef?: any; // React.Ref<FormikProps<any>>
  initialValues?: FormikConfig<any>["initialValues"];
  validationSchema?: FormikConfig<any>["validationSchema"];
  onSubmit: (values: any) => Promise<any>;
  showButtons?: boolean;
  fields: {
    label: string;
    name: string;
    type?: "string" | "number" | "autocomplete" | "select" | "boolean";
    options?: Option[];
    FieldComponent?: any;
  }[];
};

export default function FormikForm({
  fields,
  initialValues = {},
  innerRef,
  validationSchema,
  onSubmit,
  showButtons: _showButtons
}: FormikFormProps) {
  const showButtons = useMemo<boolean>(() => !innerRef || !!_showButtons, [innerRef, _showButtons]);

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values).catch(n_error)}
    >
      {({ handleSubmit, values, resetForm, isSubmitting }) => {
        console.log("values", values);
        return (
          <form onSubmit={handleSubmit}>
            <Stack direction={"column"} spacing={2}>
              {fields.map((field, key) => {
                const defaultProps = {
                  name: field.name,
                  label: field.label,
                  disabled: isSubmitting
                };

                if (field.FieldComponent) {
                  const FieldComponent = field.FieldComponent;
                  return <FieldComponent {...defaultProps} key={key} />;
                }
                switch (field.type) {
                  case "number":
                    return <FormikTextField key={key} type={"number"} {...defaultProps} />;
                  case "string":
                  case undefined:
                    return <FormikTextField key={key} {...defaultProps} />;
                  case "boolean":
                    return <FormikSwitchField key={key} {...defaultProps} />;
                  case "autocomplete":
                  case "select":
                  default:
                    return (
                      <Alert severity={"error"} key={key}>
                        <b>{field.label}</b>: неизвестный тип <b>{field.type}</b>
                      </Alert>
                    );
                }
              })}
              {showButtons && (
                <Stack direction={"row"} spacing={2} justifyContent={"end"}>
                  <Button
                    variant={"text"}
                    onClick={() => resetForm()}
                    endIcon={<RestartAlt />}
                    style={{ marginRight: "auto" }}
                  >
                    сбросить
                  </Button>
                  <Button
                    variant={"contained"}
                    disabled={isSubmitting}
                    onClick={() => handleSubmit()}
                    endIcon={<Publish />}
                  >
                    Отправить
                  </Button>
                </Stack>
              )}
            </Stack>
          </form>
        );
      }}
    </Formik>
  );
}
