export function number_format(
  number: number,
  decimals: number = 0,
  dec_point: string = ".",
  thousands_sep: string = " "
): string {
  // Validate the input number
  if (isNaN(number) || !isFinite(number)) {
    throw new Error("Input is not a valid number");
  }

  // Check if the input number has decimals
  let [integerPart, decimalPart] = number.toFixed(decimals).split(".");

  // Add thousands separator to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

  // Combine integer part and decimal part
  return decimalPart ? integerPart + dec_point + decimalPart : integerPart;
}
