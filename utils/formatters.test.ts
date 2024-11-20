import {expect, test} from "vitest";
import {declension} from "./formatters";

test("formatError", () => {
  const words = ["клиент", "клиента", "клиентов"];
  expect(declension(1, words)).eq("клиент");
  expect(declension(2, words)).eq("клиента");
  expect(declension(5, words)).eq("клиентов");
  expect(declension(12, words)).eq("клиентов");
  expect(declension(13, words)).eq("клиентов");
  expect(declension(21, words)).eq("клиент");
  expect(declension(34, words)).eq("клиента");
  expect(declension(17, words)).eq("клиентов");
});
