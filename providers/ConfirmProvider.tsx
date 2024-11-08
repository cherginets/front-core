'use client';
import {ConfirmProvider as OriginalConfirmProvider} from "material-ui-confirm";
import {ReactNode} from "react";

export default function ConfirmProvider({children}: {children: ReactNode}) {
  return <OriginalConfirmProvider>
    {children}
  </OriginalConfirmProvider>
}