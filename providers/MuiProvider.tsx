"use client";

import theme from "@/styles/theme";
import {ThemeProvider} from "@mui/material";
import {ReactNode} from "react";

export default function MuiProvider({children}: {children: ReactNode}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
