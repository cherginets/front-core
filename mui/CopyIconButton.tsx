import {CopyAll, Done} from "@mui/icons-material";
import {IconButton, IconButtonProps} from "@mui/material";
import {useCallback, useState} from "react";
import {useCopyToClipboard} from "usehooks-ts";

export default function CopyIconButton({
  copyText,
  children,
  ...props
}: {copyText: string} & Omit<IconButtonProps, "onClick">) {
  const [, copy] = useCopyToClipboard();

  const [done, setDone] = useState(false);

  const handleCopy = useCallback(() => {
    copy(copyText)
      .then(() => {
        console.log("Copied!", {text: copyText});
        setDone(true);
        setTimeout(() => setDone(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  }, [copy, copyText]);

  const IconComponent = done ? Done : CopyAll;

  return (
    <IconButton color={"primary"} onClick={() => handleCopy()} {...props}>
      {children || <IconComponent />}
    </IconButton>
  );
}
