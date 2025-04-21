import MuiButton, {ButtonProps as MuiButtonProps} from "@mui/material/Button";
import MuiLink, {LinkProps as MuiLinkProps} from "@mui/material/Link";
import NextLink, {LinkProps as NextLinkProps} from "next/link";
import {forwardRef, HTMLProps} from "react";

export const Link = ({...muiProps}: MuiLinkProps) => <MuiLink component={NextLink} {...muiProps} />;
export type ButtonLinkProps =   MuiButtonProps & {
  href: NextLinkProps["href"];
  target?: HTMLProps<HTMLLinkElement>["target"];
};
export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  ButtonLinkProps
>(({href, ...muiProps}, ref) => <MuiButton component={NextLink} href={href} ref={ref} {...muiProps} />);

export {MuiLink, NextLink};
