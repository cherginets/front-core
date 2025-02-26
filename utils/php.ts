export function number_format(
  number: number,
  decimals: number = 0,
  dec_point: string = ".",
  thousands_sep: string = " "
): string {
  // Validate the input number
  if (isNaN(number) || !isFinite(number)) {
    console.error(number, "Input is not a valid number");
    return "";
  }

  // Check if the input number has decimals
  let [integerPart, decimalPart] = number.toFixed(decimals).split(".");

  // Add thousands separator to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

  // Combine integer part and decimal part
  // todo сделать округление параметризуемым
  return (decimalPart ? integerPart + dec_point + decimalPart : integerPart).replace(/\.[0]+$/, "");
}

export function array_unique<T = any>(array: Array<T>): Array<T> {
  return array.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  })
}