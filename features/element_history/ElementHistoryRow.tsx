import {HistoryRow} from "@/core/features/element_history/ElementHistory.types";
import {useMemo, useState} from "react";
import {formatElementHistoryLevelAsJSX} from "@/core/features/element_history/formatElementHistoryLevelAsJSX";
import moment from "@/core/moment";
import formatDateTime from "@/core/utils/formatDateTime";
import {MOMENT_DATE_PRETTY} from "@/core/utils";

export const ElementHistoryRow = ({defaultShowContext, index, row}: {
  defaultShowContext: boolean
  index: number
  row: HistoryRow
}) => {
  const [manualShowContext, setManualShowContext] = useState(false);

  const showContext = useMemo(() => defaultShowContext || manualShowContext, [defaultShowContext, manualShowContext])

  const renderWho = row.who_link ?
    <a className={'text-blue-700 cursor-pointer'} target={'_blank'} href={row.who_link}>{row.who_name}</a> :
    <span>{row.who_name || row.who_id || "Система"}</span>

  return <div className={'flex flex-col gap-1 py-2'}>
    <div className={'flex flex-row gap-2 text-sm max-md:flex-col'}>
      <div className={'flex gap-2'}>
        <div>#{index}</div>
        {formatElementHistoryLevelAsJSX(row.level)}
        <span>/</span>
        {renderWho}
      </div>


      <div className={'flex flex-row gap-2 text-gray-500 ml-auto max-md:ml-0'}>
        <span>{row.id}</span>
        <span>/</span>
        <span>{moment(row.created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
      </div>
    </div>
    <div>
      <div className={'whitespace-break-spaces break-words'} dangerouslySetInnerHTML={{__html: row.text}}/>
      {!defaultShowContext && row.context && <div className={'text-blue-700 cursor-pointer'}
                                                  onClick={() => setManualShowContext(sc => !sc)}>{manualShowContext ? "скрыть контекст" : "показать контекст"}</div>}
      {showContext && row.context !== null &&
        <pre className={'bg-gray-100 text-gray-500 p-2 rounded-xl mt-2 whitespace-break-spaces break-words'}>
              {JSON.stringify(row.context, null, 2)}
            </pre>}
    </div>
  </div>
}