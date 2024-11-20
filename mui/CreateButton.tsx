import {Add} from "@mui/icons-material";
import {ButtonProps} from "@mui/material";
import Button from "@mui/material/Button";

export default function CreateButton(props: ButtonProps) {
  return <Button endIcon={<Add />} variant={"contained"} {...props} />;
}
