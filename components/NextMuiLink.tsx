import MuiButton, {ButtonProps as MuiButtonProps} from "@mui/material/Button";
import MuiLink, {LinkProps as MuiLinkProps} from "@mui/material/Link";
import NextLink, {LinkProps as NextLinkProps} from "next/link";
import {forwardRef, HTMLProps} from "react";

export const Link = ({...muiProps}: MuiLinkProps) => <MuiLink component={NextLink} {...muiProps} />;
export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  MuiButtonProps & {
    href: NextLinkProps["href"];
    target?: HTMLProps<HTMLLinkElement>["target"];
  }
>(({href, ...muiProps}, ref) => <MuiButton component={NextLink} href={href} ref={ref} {...muiProps} />);

export {MuiLink, NextLink};
