import {ArrowBack} from "@mui/icons-material";
import {ButtonProps} from "@mui/material";
import Button from "@mui/material/Button";

export default function BackButton(props: ButtonProps) {
  return <Button startIcon={<ArrowBack />} variant={"text"} {...props} />;
}
