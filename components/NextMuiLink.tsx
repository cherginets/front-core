import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import NextLink from "next/link";

const Link = ({ ...muiProps }: MuiLinkProps) => (
  <MuiLink component={NextLink} {...muiProps} />
);

export { Link, MuiLink, NextLink };
