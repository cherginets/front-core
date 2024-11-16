const isBrowser = typeof window !== "undefined";

export const setCookie = (
  name: string,
  value: string,
  options: any /*todo*/,
) => {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: "/",
    ...options,
  };

  const expires = new Date(
    Date.now() + optionsWithDefaults.days * 864e5,
  ).toUTCString();

  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=" +
    optionsWithDefaults.path;
};

export const getCookie = (name: string, initialValue = "") => {
  return (
    (isBrowser &&
      document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, "")) ||
    initialValue
  );
};

export const clearCookie = (name: string) => {
  setCookie(name, "", {
    "max-age": -1,
  });
};
