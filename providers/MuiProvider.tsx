"use client";

import { ReactNode } from "react";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";

export default function MuiProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
