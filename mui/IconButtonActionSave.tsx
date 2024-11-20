import {Close, Done} from "@mui/icons-material";
import IconButton, {IconButtonProps} from "./IconButton";

type IconButtonActionSaveProps = IconButtonProps;
export function IconButtonActionSave(props: IconButtonActionSaveProps) {
  return (
    <IconButton title={"Сохранить"} color={"success"} {...props}>
      <Done />
    </IconButton>
  );
}

type IconButtonActionCancelProps = IconButtonProps;
export function IconButtonActionCancel(props: IconButtonActionSaveProps) {
  return (
    <IconButton title={"Отменить"} color={"default"} {...props}>
      <Close />
    </IconButton>
  );
}
