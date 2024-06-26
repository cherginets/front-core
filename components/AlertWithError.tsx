import Alert, { AlertProps } from "@mui/material/Alert";
import {formatError} from "@/core/utils/formatError";

export function AlertWithError({ error, ...props }: { error: any } & AlertProps) {
  if (!error) return null;
  return (
    <Alert severity={"error"} {...props}>
      <pre>{formatError(error)}</pre>
    </Alert>
  );
}
