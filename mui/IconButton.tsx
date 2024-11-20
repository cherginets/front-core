import {NextLink} from "@/core/components/NextMuiLink";
import {Tooltip, TooltipProps} from "@mui/material";
import MuiIconButton, {IconButtonProps as MuiIconButtonProps} from "@mui/material/IconButton";
import {FC, ReactElement, ReactNode} from "react";

export type IconButtonProps = {
  title?: TooltipProps["title"];
  href?: string;
} & Omit<MuiIconButtonProps, "title">;

const IconButton: FC<IconButtonProps> = ({title, href, ...props}) => {
  const LinkWrapper = href
    ? ({children}: {children: ReactElement<any, any>}) => <NextLink href={href}>{children}</NextLink>
    : ({children}: {children: ReactNode}) => children;
  const TooltipWrapper = title
    ? ({children}: {children: ReactElement<any, any>}) => <Tooltip title={title}>{children}</Tooltip>
    : ({children}: {children: ReactNode}) => children;

  return (
    <LinkWrapper>
      <TooltipWrapper>
        <MuiIconButton {...props} />
      </TooltipWrapper>
    </LinkWrapper>
  );
};

export default IconButton;
