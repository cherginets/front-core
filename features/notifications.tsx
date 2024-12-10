'use client';
import {formatError} from "@/core/utils/formatError";
import {Fragment, ReactNode} from "react";
import {ToastContainer, ToastContent, ToastOptions, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationsProvider = ({children}: {children: ReactNode}) => (
  <Fragment>
    {children}
    <ToastContainer theme={"colored"} position={"top-right"} />
  </Fragment>
);

export const n_default = toast;
export const n_success = toast.success;
export const n_error = (error: ToastContent, options?: ToastOptions) => {
  toast.error(formatError(error), options);
};
export const n_info = toast.info;
export const n_warning = toast.warning;

export const n_promise: typeof toast.promise = (promise, {pending, error, success} = {}) => {
  // @ts-ignore
  if (!!promise.unwrap) promise = promise.unwrap();

  return toast.promise(promise, {
    pending: pending || "Выполнение скрипта",
    error: error || {
      render: ({data: error}) => {
        console.log("error", error);
        // @ts-ignore
        return formatError(error?.data as any);
      },
    },
    success: success || "Успех",
  });
};
