import {n_error} from "@/core/features/notifications";
import {Check, Close, Edit} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import TextField from "@mui/material/TextField";
import {FC, ReactNode, useCallback, useEffect, useState} from "react";
import {useBoolean} from "usehooks-ts";

type EditableStringProps = {
  initValue: string;
  nullLabel?: string;
  onEdit: (value: string) => Promise<any>;
  children: ReactNode;
};
const EditableString: FC<EditableStringProps> = ({children, initValue, onEdit, nullLabel}: EditableStringProps) => {
  const [value, setValue] = useState(initValue);
  useEffect(() => setValue(initValue), [initValue]);

  const {setTrue: start, setFalse: stop, value: loading} = useBoolean(false);

  const [edit, setEdit] = useState(false);

  const close = useCallback(() => {
    setEdit(false);
    setValue(initValue);
  }, [initValue]);

  const submit = useCallback(() => {
    start();
    onEdit(value)
      .then(() => {
        setEdit(false);
      })
      .catch(n_error)
      .finally(stop);
  }, [start, stop, onEdit, value]);

  return !edit ? (
    <div style={{display: "flex", alignItems: "center"}}>
      {children}
      <IconButton size={"small"} onClick={setEdit.bind(null, true)}>
        <Edit />
      </IconButton>
    </div>
  ) : (
    <div style={{display: "flex", alignItems: "center"}}>
      <TextField
        label={"Введите значение"}
        size={"small"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
        autoFocus
        onKeyUp={(e) => e.key === "Enter" && submit()}
      />
      <IconButton size={"small"} onClick={submit} style={{color: "green"}} disabled={loading}>
        <Check />
      </IconButton>
      <IconButton size={"small"} style={{color: "red"}} onClick={close} disabled={loading}>
        <Close />
      </IconButton>
    </div>
  );
};

export default EditableString;
