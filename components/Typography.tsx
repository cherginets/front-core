import {Typography, TypographyProps} from "@mui/material";

export const H1 = (props: Omit<TypographyProps, "variant">) => (
  <Typography component={"h1"} variant={"h1"} {...props} />
);
export const H2 = (props: Omit<TypographyProps, "variant">) => (
  <Typography component={"h2"} variant={"h2"} {...props} />
);
export const H3 = (props: Omit<TypographyProps, "variant">) => (
  <Typography component={"h3"} variant={"h3"} {...props} />
);
export const H4 = (props: Omit<TypographyProps, "variant">) => (
  <Typography component={"h4"} variant={"h4"} {...props} />
);
export const H5 = (props: Omit<TypographyProps, "variant">) => (
  <Typography component={"h5"} variant={"h5"} {...props} />
);
export const H6 = (props: Omit<TypographyProps, "variant">) => (
  <Typography component={"h6"} variant={"h6"} {...props} />
);
