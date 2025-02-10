import {
  ButtonProps,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogProps as MuiDialogProps,
  DialogTitle
} from "@mui/material";
import Button from "@mui/material/Button";

export type DialogProps = {
  title?: string
  onClose: () => any
  onSubmit: () => any
  buttonConfirmText?: string
  buttonCancelText?: string
  buttonConfirmProps?: ButtonProps
  buttonCancelProps?: ButtonProps
} & Omit<MuiDialogProps, 'open' | 'onClose'>

export const Dialog = (
  {
    title, onClose, children,
    onSubmit,
    buttonConfirmText = "ОК",
    buttonCancelText = "Отменить",
    buttonConfirmProps,
    buttonCancelProps,
    ...props}: DialogProps) => {
  return <MuiDialog open={true} onClose={() => onClose()} {...props}>
    {title && <DialogTitle className={'!text-2xl !font-bold'}>{title}</DialogTitle>}
    <DialogContent>{children}</DialogContent>
    <DialogActions className={'!p-4'}>
      <Button onClick={() => onClose()} className={'!mr-auto'} {...buttonCancelProps}>{buttonCancelText}</Button>
      <Button onClick={() => onSubmit()} variant={'contained'} {...buttonConfirmProps}>{buttonConfirmText}</Button>
    </DialogActions>
  </MuiDialog>
}