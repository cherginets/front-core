import {HistoryRow} from "@/core/features/element_history/ElementHistory.types";
import {formatElementHistoryLevelAsJSX} from "@/core/features/element_history/formatElementHistoryLevelAsJSX";
import moment from "@/core/moment";
import {useMemo, useState} from "react";

export const ElementHistoryRow = ({
  defaultShowContext,
  index,
  row,
}: {
  defaultShowContext: boolean;
  index: number;
  row: HistoryRow;
}) => {
  const [manualShowContext, setManualShowContext] = useState(false);

  const showContext = useMemo(() => defaultShowContext || manualShowContext, [defaultShowContext, manualShowContext]);

  const renderWho = row.who_link ? (
    <a className={"cursor-pointer text-blue-700"} target={"_blank"} href={row.who_link}>
      {row.who_name}
    </a>
  ) : (
    <span>{row.who_name || row.who_id || "Система"}</span>
  );

  return (
    <div className={"flex flex-col gap-1 py-2"}>
      <div className={"flex flex-row gap-2 text-sm max-md:flex-col"}>
        <div className={"flex gap-2"}>
          <div>#{index}</div>
          {formatElementHistoryLevelAsJSX(row.level)}
          <span>/</span>
          {renderWho}
          {!defaultShowContext && row.context && (
            <>
              <span>/</span>
              <div className={"cursor-pointer text-blue-700"} onClick={() => setManualShowContext((sc) => !sc)}>
                {manualShowContext ? "скрыть контекст" : "показать контекст"}
              </div>
            </>
          )}
        </div>

        <div className={"ml-auto flex flex-row gap-2 text-gray-500 max-md:ml-0"}>
          <span>{row.id}</span>
          <span>/</span>
          <span>{moment(row.created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
        </div>
      </div>
      <div>
        <div className={"whitespace-break-spaces break-words"} dangerouslySetInnerHTML={{__html: row.text}} />
        {showContext && row.context !== null && (
          <pre className={"mt-2 whitespace-break-spaces break-words rounded-xl bg-gray-100 p-2 text-gray-500"}>
            {JSON.stringify(row.context, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};
