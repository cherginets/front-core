export const formatCount = (
  value: string | number,
  nullString: string = "-",
) => {
  // @ts-ignore
  return value > 0 ? `${value} шт.` : nullString;
};
