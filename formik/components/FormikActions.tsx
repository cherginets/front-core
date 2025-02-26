import Button from "@mui/material/Button";
import {useFormikContext} from "formik";
import {AlertWithError} from "@/core/components/AlertWithError";

export type FormikActionsProps = {
  showErrors?: boolean,
  confirmButtonText?: string
  disableResetButton?: boolean
}
const FormikActions = (
  {
    showErrors = true,
    confirmButtonText = "Сохранить",
    disableResetButton = false,
  }: FormikActionsProps) => {
  const {handleSubmit, resetForm, errors, isValid, isSubmitting} = useFormikContext();

  return <div className={'flex flex-col gap-2'}>
    <div className={'flex flex-row gap-2 justify-between'}>
      {!disableResetButton && <Button onClick={() => resetForm()}>Сбросить</Button>}
      <Button
        className={'!ml-auto'}
        variant={'contained'}
        onClick={() => handleSubmit()}
        disabled={!isValid || isSubmitting}
      >{confirmButtonText}</Button>
    </div>
    {!!Object.keys(errors).length && <AlertWithError error={errors} />}
  </div>;
}

export default FormikActions;