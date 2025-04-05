import CSS from "csstype";

export type NumericOption = Option<number>;
export type StringOption = Option<string>;

export type Option<ValueType = string | number> = {
  label: string;
  value: ValueType;
  color?: CSS.Properties["color"];
  disabled?: boolean
};
