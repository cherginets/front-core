import {Preloader} from "@/core/components/Preloader";
import {useElementHistory, useElementHistoryProps} from "@/core/components/history/useElementHistory";
import moment from "moment";
import {formatError} from "@/core/utils/formatError";
import {Add, Close, Send, Sync} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {Alert, Button, Divider} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Fragment} from "react";
import {useBoolean} from "usehooks-ts";
import classes from "./ElementHistory.module.scss";

const PRIORITY_LABELS = {
  success: <span style={{color: "green"}}>Успех</span>,
  error: <span style={{color: "red"}}>Ошибка</span>,
  info: <span style={{color: "black"}}>Информация</span>,
  warning: <span style={{color: "orange"}}>Предупреждение</span>,
  debug: <span style={{color: "gray"}}>Отладка</span>,
};

export type ElementHistoryProps = {
  title: string;
} & useElementHistoryProps;
function ElementHistory({title, ...props}: ElementHistoryProps) {
  const {
    data,
    newComment,
    setNewComment,
    loading,
    error,
    submitLoading,
    send,
    fetch,
    fetchMore,
    canLoadMore,
    loadingMore,
  } = useElementHistory(props);

  const {value: adding, toggle: addingToggle} = useBoolean(false);

  if (loading) return <Preloader />;

  if (error)
    return (
      <Alert severity={"error"}>
        {formatError(error)} / <a onClick={fetch}>обновить</a>
      </Alert>
    );

  return (
    <div className={classes.root}>
      <h3>{title}</h3>

      {loading ? (
        <Preloader />
      ) : (
        <>
          <div className={classes.newMessage}>
            <div style={{display: "flex", marginBottom: 12, width: "100%"}}>
              <Button
                endIcon={adding ? <Close /> : <Add />}
                onClick={addingToggle}
                variant={!adding ? "outlined" : undefined}
              >
                {adding ? "отменить написание" : "добавить комментарий"}
              </Button>
              <Button onClick={fetch} endIcon={<Sync />} style={{marginLeft: "auto"}}>
                Обновить
              </Button>
            </div>
            {adding && (
              <>
                <TextField
                  className={classes.newMessage__input}
                  variant={"outlined"}
                  label={"Новый комментарий"}
                  rows={3}
                  multiline
                  fullWidth
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={submitLoading}
                  onKeyUp={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      send();
                    }
                  }}
                  style={{marginBottom: 12}}
                  autoFocus
                />
                <Button
                  className={classes.newMessage__button}
                  endIcon={<Send />}
                  onClick={send}
                  disabled={submitLoading || !newComment}
                  variant={"contained"}
                  fullWidth
                >
                  Добавить комментарий (CTRL+ENTER)
                </Button>
                <Divider />
              </>
            )}
          </div>

          {loading && <Preloader />}

          {data && data.length > 0 ? (
            data.map(({id, who_name, message, created_at, level}, i) => {
              const date = moment(created_at).isValid() ? moment(created_at).format("DD-MM-YYYY HH:mm:ss") : created_at;

              return (
                <Fragment key={id}>
                  <div className={classes.item}>
                    <div className={classes.firstLine}>
                      <div className={classes.fieldIndex}>#{data.length - i}</div>
                      <div className={classes.fieldPriority}>{PRIORITY_LABELS[level] || level}</div>
                      <div className={classes.fieldWho}>{who_name}</div>
                      <div className={classes.fieldDate}>{date}</div>
                    </div>
                    <pre className={classes.fieldText} dangerouslySetInnerHTML={{__html: message}} />
                  </div>
                  {i !== data.length - 1 && <Divider />}
                </Fragment>
              );
            })
          ) : (
            <span>Записей в истории этого элемента пока нет</span>
          )}

          {canLoadMore && (
            <LoadingButton onClick={fetchMore} loading={loadingMore}>
              Загрузить ещё
            </LoadingButton>
          )}
        </>
      )}
    </div>
  );
}

export default ElementHistory;
