import { copyToClipboard } from "@/core/components/CopyToClipboard/clipboard";
import { n_success } from "@/core/features/notifications";
import { ContentCopy } from "@mui/icons-material";
import { IconButton, Typography, TypographyProps } from "@mui/material";

export default function CopyToClipboardTypography({
  textToCopy,
  children = textToCopy,
    successText = "Скопировано!",
  ...props
}: TypographyProps & {
  textToCopy: string;
  successText?: string;
}) {
  return (
    <Typography {...props}>
      <IconButton
        size={"small"}
        onClick={() => {
          copyToClipboard({ value: textToCopy });
          n_success(successText);
        }}
      >
        <ContentCopy fontSize={"small"} />
      </IconButton>
      {children}
    </Typography>
  );
}
