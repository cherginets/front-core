import { ReactNode, useState } from "react";
import { Button, Stack } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

export default function CutBlock({
  showMessage = "Показать",
  hideMessage = "Скрыть",
  children,
}: {
  showMessage?: string;
  hideMessage?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Stack direction={"column"} spacing={1}>
      <Button onClick={() => setOpen((o) => !o)}>
        {open ? hideMessage : showMessage}
      </Button>
      {open && <div style={{ width: "100%" }}>{children}</div>}
    </Stack>
  );
}
