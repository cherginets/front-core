"use client";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ConfirmProvider } from "material-ui-confirm";
import { ReactNode } from "react";

export default function MuiThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            cancellationText: "Отмена",
            confirmationText: "Подтвердить",
            cancellationButtonProps: {
              style: { marginRight: "auto" },
            },
            confirmationButtonProps: {
              variant: "contained",
            },
            title: "Вы уверены?",
            content: "Необходимо подтвердить действие.",
          }}
        >
          {children}
        </ConfirmProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
