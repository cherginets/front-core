import {MOMENT_DATE_PRETTY} from "@/core/utils/formatters";
import {MomentInput} from "moment";
import moment from "@/core/moment";

export default function formatDateTime(str: MomentInput) {
  return moment(str).format(MOMENT_DATE_PRETTY);
}
