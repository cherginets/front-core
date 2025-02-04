import moment from "@/core/moment";

export default function formatDate(str: string) {
  return moment(str).calendar();
}
