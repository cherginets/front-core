"use client";

import theme from "@/styles/theme";
import {LockOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {Alert, Avatar, Button, CircularProgress, Grid, Stack} from "@mui/material";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import {useCallback} from "react";
import {NextLink} from "../NextMuiLink";

interface Values {
  username: string;
  password: string;
}

type InitialData = {
  username: string;
  password: string;
};
const initialData: InitialData = {
  username: "",
  password: "",
};

type MuiAuthFormProps = {
  isLoading?: boolean;
  error?: string;
  onSubmit: (values: InitialData) => Promise<any>;
  disableAuthByCode: boolean;
  disableAuthByServices: boolean;
  registerLink?: string;
  forgotLink?: string;
};

function MuiAuthForm({
  isLoading,
  error,
  onSubmit,
  disableAuthByCode = true,
  disableAuthByServices = true,
  registerLink,
  forgotLink,
}: MuiAuthFormProps) {
  const PreparedTextField = useCallback(
    (p: any) => <TextField fullWidth size={"medium"} InputLabelProps={{shrink: true}} {...p} />,
    []
  );

  return (
    <Grid container spacing={2} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
      <Grid size={{xs: 12, md: 12}}>
        <Formik<InitialData>
          initialValues={initialData}
          onSubmit={(values, {setSubmitting}) => {
            return onSubmit(values);
          }}
          render={({submitForm}) => (
            <Form>
              <Stack style={{position: "relative"}} direction={"column"} spacing={3} alignItems={"center"}>
                <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                  {isLoading ? <CircularProgress size={25} style={{color: "white"}} /> : <LockOutlined />}
                </Avatar>

                <Field
                  component={PreparedTextField}
                  name="username"
                  type="username"
                  label="Username *"
                />
                <Field
                  component={PreparedTextField}
                  type="password"
                  label="Password *"
                  name="password"
                />

                <Button
                  variant="contained"
                  size={"large"}
                  color="primary"
                  onClick={() => submitForm()}
                  fullWidth
                  disabled={isLoading}
                >
                  Войти в систему
                </Button>

                {error && <Alert severity={"error"}>{error}</Alert>}
              </Stack>
            </Form>
          )}
        />
      </Grid>

      {registerLink && (
        <Grid size={{xs: 6}}>
          <NextLink href={registerLink}>
            <Button fullWidth>Регистрация</Button>
          </NextLink>
        </Grid>
      )}

      {forgotLink && (
        <Grid size={{xs: 6}}>
          <NextLink href={forgotLink}>
            <Button fullWidth>Забыли пароль</Button>
          </NextLink>
        </Grid>
      )}

      {!disableAuthByCode && (
        <Grid size={{xs: 12, md: 6}}>
          <Stack direction={"column"} spacing={2}>
            <h2>По коду</h2>
            <Button fullWidth variant={"outlined"}>
              На почту
            </Button>
            <Button fullWidth variant={"outlined"} disabled>
              На телефон
            </Button>
          </Stack>
        </Grid>
      )}

      {!disableAuthByServices && (
        <Grid  size={{xs: 12, md: 6}}>
          <Stack direction={"column"} spacing={2}>
            <h2>Через сервисы</h2>
            <Button fullWidth variant={"contained"}>
              Github
            </Button>
            <Button fullWidth variant={"contained"} disabled>
              Google
            </Button>
            <Button fullWidth variant={"contained"} disabled>
              Yandex
            </Button>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}

export default MuiAuthForm;
