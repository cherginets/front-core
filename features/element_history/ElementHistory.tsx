"use client";
import {
  ElementHistoryAddRequest,
  ElementHistoryAddResponse,
  HistoryRow,
} from "@/core/features/element_history/ElementHistory.types";
import {ElementHistoryRow} from "@/core/features/element_history/ElementHistoryRow";
import {n_error} from "@/core/features/notifications";
import {Add, Close, Send, Sync} from "@mui/icons-material";
import {IconButton, LinearProgress, Switch, TextareaAutosize} from "@mui/material";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import {BaseQueryFn, MutationDefinition, QueryDefinition} from "@reduxjs/toolkit/query";
import {useCallback, useState} from "react";
import {useLocalStorage} from "usehooks-ts";
// @ts-expect-error something
import {UseMutation} from "@reduxjs/toolkit/dist/query/react";

export type ElementHistoryProps = {
  title?: string;
  element_type: string;
  element_id: string | number;
  useAddMutation: UseMutation<
    MutationDefinition<ElementHistoryAddRequest, BaseQueryFn, any, ElementHistoryAddResponse>
  >;
  useSearchQuery: UseMutation<QueryDefinition<ElementHistoryAddRequest, BaseQueryFn, any, ElementHistoryAddResponse>>;
};

const ElementHistory = ({title, element_type, element_id, useAddMutation, useSearchQuery}: ElementHistoryProps) => {
  const {data: {rows} = {rows: []}, isLoading, isFetching, refetch} = useSearchQuery({element_type, element_id});
  const [add, {isLoading: addLoading}] = useAddMutation();

  const [adding, setAdding] = useState(false);
  const [showContext, setShowContext] = useLocalStorage(`history_showContext-[${element_type}]`, true);
  const [newComment, setNewComment] = useState("");

  const submitAdd = useCallback(() => {
    add({element_type, element_id: String(element_id), text: newComment})
      .unwrap()
      .then(() => {
        setNewComment("");
        setAdding(false);
      })
      .catch(n_error);
  }, [newComment, add, element_type, element_id]);

  return (
    <div className={"flex flex-col"}>
      {title && <div className={"mb-4 text-2xl font-bold"}>{title}</div>}

      <div
        className={"mb-2 flex flex-row items-center gap-4 max-md:mb-2 max-md:gap-2 max-sm:flex-col max-sm:items-start"}
      >
        <FormControlLabel
          label={`Показывать контекст`}
          onChange={(e, checked) => setShowContext((sc) => !sc)}
          control={<Switch checked={showContext} />}
        />
        <div className={"mx-auto"} />
        {!adding ? (
          <Button startIcon={<Add />} variant={"outlined"} onClick={() => setAdding((a) => !a)}>
            Добавить комментарий
          </Button>
        ) : (
          <Button
            startIcon={<Close />}
            onClick={() => {
              setAdding((a) => !a);
              setNewComment("");
            }}
            color={"error"}
          >
            Отменить комментарий
          </Button>
        )}
        <IconButton onClick={refetch}>
          <Sync />
        </IconButton>
      </div>

      {adding && (
        <div className={"my-2 flex"}>
          <div className={"flex grow flex-col gap-1"}>
            <TextareaAutosize
              autoFocus
              placeholder={"Введите текст комментария"}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={"!grow border p-2 outline-none"}
              onKeyUp={(e) => {
                if (e.ctrlKey && e.key === "Enter") {
                  submitAdd();
                }
              }}
            />
            <div className={"pl-2 text-xs text-gray-500"}>
              Отправка доступна по CTRL+Enter. Отправленное сообщение нельзя будет удалить
            </div>
          </div>
          <Button
            className={"!ml-4"}
            variant={"outlined"}
            endIcon={<Send />}
            disabled={addLoading}
            onClick={() => submitAdd()}
          >
            Отправить
          </Button>
        </div>
      )}

      <div className={"relative divide-y"}>
        {(isLoading || isFetching) && <LinearProgress className={"!absolute !left-0 !right-0 top-[-4px]"} />}
        {rows.map((row: HistoryRow, i: number) => {
          return <ElementHistoryRow key={i} index={rows.length - i} row={row} defaultShowContext={showContext} />;
        })}
      </div>
    </div>
  );
};

export default ElementHistory;
