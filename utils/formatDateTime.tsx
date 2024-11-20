import {MOMENT_DATE_PRETTY} from "@/core/utils/formatters";
import moment from "moment";

export default function formatDateTime(str: string) {
  return moment(str).format(MOMENT_DATE_PRETTY);
}
