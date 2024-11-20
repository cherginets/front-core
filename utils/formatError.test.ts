import {expect, test} from "vitest";
import {formatError} from "./formatError";

test("formatError", () => {
  const defaultError = "error";

  const values = [
    defaultError,
    [defaultError],
    {error: defaultError},
    {error: {error: {error: defaultError}}},
    {response: {result: {error: defaultError}}},
    {result: {error: defaultError}},
    {result: {errors: defaultError}},
    {errors: defaultError},
    {},
    null,
    undefined,
    {a: 5},
    5,
    -5,
    false,
    true,
    0,
  ];

  values.forEach((v) => expect(typeof formatError(v) === "string", `"${v}" не строка`).toBeTruthy());
});
