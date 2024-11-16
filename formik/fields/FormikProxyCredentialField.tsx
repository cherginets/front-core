import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useFormikContext } from "formik";
import { isNumeric } from "@/core/utils/isNumeric";
import { FormikTextFieldProps } from "@/core/formik/fields/FormikTextField";
import { FormikTextField } from "@/core/formik";
import { Sync } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function FormikProxyCredentialField({
  ...props
}: FormikTextFieldProps) {
  const formik = useFormikContext<any>();

  return (
    <FormikTextField
      {...props}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              disabled={formik.isSubmitting}
              onClick={() => {
                formik.setFieldValue(props.name, generateRandomCredential());
              }}
            >
              <Sync />
            </IconButton>
          ),
        },
      }}
    />
  );
}

function generateRandomCredential(length: number = 8): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnprstuvwxyz23456789"; // Разрешенные символы
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
