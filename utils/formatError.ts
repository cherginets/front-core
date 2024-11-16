export const formatError = (error: any): string => {
  const status = error?.response?.status || error?.status || error?.statusCode || 0;

  const UNKNOWN_ERROR = `${status > 0 ? `[${status}] ` : ""}` + JSON.stringify(error);

  if (!error) {
    return UNKNOWN_ERROR;
  }
  if (typeof error === "string") return error;
  if (typeof error === "boolean") return JSON.stringify(error);
  if (typeof error === "number") return JSON.stringify(error);

  const potentialError =
    error?.error ||
    error?.errors ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.data?.errors ||
    error?.data?.error ||
    error?.response?.data?.result ||
    error?.message ||
    error?.message ||
    error ||
    UNKNOWN_ERROR;

  if (Array.isArray(potentialError)) {
    if (potentialError.length === 1) return formatError(potentialError[0]);

    return (
      potentialError
        .map((e) => formatError(e))
        .filter((e) => e !== UNKNOWN_ERROR)
        .join(",\n") || UNKNOWN_ERROR
    );
  }

  return typeof potentialError === 'string' ? potentialError : JSON.stringify(potentialError);
}