import {formatMoney} from "@/core/utils";
import {twMerge} from "tailwind-merge";

export default function FormattedUserBalance({balance}: {balance: number | string}) {
  const b = Number(balance)
  return <b className={twMerge(
    b > 0 && 'text-cyan-700',
    !b && 'text-gray-500',
    b < 0 && 'text-red-500',
  )}>{formatMoney(balance)}</b>
}