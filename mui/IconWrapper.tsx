import styled from "@emotion/styled";
import {CSSProperties, FC, useMemo} from "react";

export type StyledIconProps = {
  size?: "xsmall" | "small" | "medium" | "large";
  children: any;
  style?: CSSProperties;
};

const Styled = styled("div")({
  marginLeft: 5,
  marginRight: 5,

  display: "inline-flex",
  alignItems: "center",
  border: "1px solid #e8e8e8",
  justifyContent: "center",
  overflow: "hidden",
});

export const getIconWidth = (size: StyledIconProps["size"]) => {
  switch (size) {
    case "xsmall":
      return 16;
    case "small":
      return 20;
    case "large":
      return 32;
    case "medium":
    default:
      return 24;
  }
};

const IconWrapper: FC<StyledIconProps> = ({style = {}, size, children}) => {
  const width = useMemo<number>(() => getIconWidth(size), [size]);
  const height = useMemo(() => width, [width]);

  return (
    <Styled
      style={{
        width: width,
        height: height,
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height,
        borderRadius: 100,
        ...style,
      }}
    >
      {children}
    </Styled>
  );
};

export default IconWrapper;
