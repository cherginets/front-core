import moment from "moment";

export default function formatDate(str: string) {
  return moment(str).calendar();
}
