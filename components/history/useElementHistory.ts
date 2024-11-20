import {n_error} from "@/core/features/notifications";
import {useLoader} from "@/core/hooks/useLoader";
import {useCallback, useEffect, useState} from "react";

export type HistoryElementId = string | number;

export type HistoryItem = {
  id: number;
  element_type?: string;
  element_id?: string;
  who: "system" | "user";
  who_user_id: number;
  who_name: string;
  level: "info" | "warning" | "error" | "success" | "debug";
  message: string;
  created_at: string;
};

export type useElementHistoryProps = {
  elementId: string | number;
  elementType: string;
  reloadValue?: number;
  actionSearchHistory: (data: {offset: number; limit: number}) => Promise<{
    rows: HistoryItem[];
    total: number;
  }>;
  actionAddHistory: (message: string) => Promise<HistoryItem>;
  limit?: number;
};

export function useElementHistory({
  elementType,
  elementId,
  reloadValue,
  actionSearchHistory,
  actionAddHistory,
  limit = 10,
}: useElementHistoryProps) {
  const [newComment, setNewComment] = useState("");

  const [data, setData] = useState<HistoryItem[]>([]);

  // region Fetch
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const {start, stop, loading} = useLoader(true);
  const {start: startMore, stop: stopMore, loading: loadingMore} = useLoader(false);
  const fetch = useCallback(() => {
    setError(null);
    start();
    actionSearchHistory({offset: 0, limit})
      .then(({rows, total}: any) => {
        setData(rows);
        setTotal(total);
      })
      .catch((error: any) => setError(error))
      .finally(stop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, stop, elementId, elementType]);

  const fetchMore = useCallback(() => {
    startMore();

    const offset = data.length;

    actionSearchHistory({offset, limit})
      .then(({rows, total}: any) => {
        setData([...data, ...rows]);
        setTotal(total);
      })
      .catch((error: any) => setError(error))
      .finally(stop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startMore, stopMore, limit, data]);

  useEffect(() => {
    fetch();
  }, [fetch, reloadValue]);
  // endregion

  // region Submit
  const {start: submitStart, stop: submitStop, loading: submitLoading} = useLoader(false);
  const send = useCallback(() => {
    submitStart();
    actionAddHistory(newComment)
      .then((response: any) => {
        setData([response, ...data]);
        setNewComment("");
      })
      .catch(n_error)
      .finally(submitStop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitStart, submitStop, newComment, data]);
  // endregion

  return {
    data,
    newComment,
    setNewComment,
    loading,
    error,
    submitLoading,
    send,
    fetch,
    fetchMore,
    loadingMore,
    canLoadMore: data.length < total,
  };
}
