import EditableString, {EditableStringProps} from "@/core/mui/EditableString";
import {Moment} from "moment";
import moment from "@/core/moment";

export const EditableDateTimeString = ({initValue, onEdit, ...props}: EditableStringProps<Moment>) => {
  return <EditableString<string>
    {...props}
    initValue={initValue.format("YYYY-MM-DDTHH:mm")}
    onEdit={(value) => onEdit(moment(value, "YYYY-MM-DDTHH:mm"))}
    textFieldProps={{
      type: "datetime-local",
    }}
  />
}