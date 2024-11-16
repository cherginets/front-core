export * from "./cookies";
export * from "./formatError";
export * from "./formatters";

export function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
