import { formatError } from "@/core/utils/formatError";
import Alert, { AlertProps } from "@mui/material/Alert";

export function AlertWithError({
  error,
  ...props
}: { error: any } & AlertProps) {
  if (!error) return null;
  return (
    <Alert severity={"error"} {...props}>
      <pre style={{ whiteSpace: "break-spaces" }}>{formatError(error)}</pre>
    </Alert>
  );
}
