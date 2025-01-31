import {MOMENT_DATE_PRETTY} from "@/core/utils/formatters";
import moment, {MomentInput} from "moment";

export default function formatDateTime(str: MomentInput) {
  return moment(str).format(MOMENT_DATE_PRETTY);
}
