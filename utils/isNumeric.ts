export function isNumeric(value?: any): boolean {
  return value != null && value !== "" && !Array.isArray(value) && !isNaN(Number(value.toString()));
}
