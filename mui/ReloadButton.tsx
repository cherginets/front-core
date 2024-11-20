import {Sync} from "@mui/icons-material";
import {ButtonProps} from "@mui/material";
import Button from "@mui/material/Button";

export default function ReloadButton({...props}: ButtonProps) {
  return (
    <Button variant={"outlined"} endIcon={<Sync />} {...props}>
      Обновить
    </Button>
  );
}
