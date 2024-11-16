import { useCallback, useState } from "react";

export type ReloadValue = number;

export function useReload() {
  const [reloadValue, setReloadValue] = useState<ReloadValue>(1);
  const reload = useCallback(
    () => setReloadValue((reloadValue) => reloadValue + 1),
    [],
  );

  return { reloadValue, reload };
}
