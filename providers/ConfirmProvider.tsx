"use client";
import {ConfirmProvider as OriginalConfirmProvider} from "material-ui-confirm";
import {ReactNode} from "react";

export type ConfirmProviderProps = {
  children: ReactNode
}
export default function ConfirmProvider({children}: ConfirmProviderProps) {
  return (
    <OriginalConfirmProvider
      defaultOptions={{
        confirmationText: "ОК",
        cancellationText: "Отменить",
        cancellationButtonProps: {
          style: {
            marginRight: "auto",
          },
        },
        confirmationButtonProps: {
          variant: "contained",
        },
      }}
    >
      {children}
    </OriginalConfirmProvider>
  );
}
