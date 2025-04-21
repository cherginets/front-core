import {formatError} from "@/core/utils/formatError";
import Alert, {AlertProps} from "@mui/material/Alert";
import Button from "@mui/material/Button";
import {Sync} from "@mui/icons-material";

export function AlertWithError({error, refetch, ...props}: {error: any; refetch?: () => any} & AlertProps) {
  if (!error) return null;
  return (
    <Alert severity={"error"} {...props}>
      <pre style={{whiteSpace: "break-spaces"}}>{formatError(error)}</pre>
      {refetch && (
        <Button variant={"contained"} startIcon={<Sync />} style={{marginTop: 16}} onClick={() => refetch()}>
          Перезагрузить
        </Button>
      )}
    </Alert>
  );
}
