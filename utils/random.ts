import moment from "moment";

export function randomInteger(min: number = 0, max: number = 1000000) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomString(length: number = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function randomDate() {
  return moment();
}

export function randomElementFromArray<T = any>(array: T[]): T {
  if (!array.length) throw "array is empty";
  const index = randomInteger(0, array.length - 1);
  return array[index];
}
