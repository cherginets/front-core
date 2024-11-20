import {useCallback, useState} from "react";
import {Preloader} from "../components/Preloader";
export function useLoader(loadingDefault: boolean) {
  const [loading, _setLoading] = useState<boolean>(loadingDefault);

  const setLoading = useCallback((state: boolean) => {
    _setLoading(state);
  }, []);

  const start = useCallback(() => setLoading(true), [setLoading]);
  const stop = useCallback(() => setLoading(false), [setLoading]);
  const ComponentPreloader = useCallback((props: any) => <Preloader loading={loading} {...props} />, [loading]);

  return {
    loading,
    setLoading,
    start,
    stop,
    Preloader: ComponentPreloader,
  };
}
