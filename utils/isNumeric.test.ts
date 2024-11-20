import {expect, test} from "vitest";
import {isNumeric} from "./isNumeric";

test("isNumeric", () => {
  const trueValues = [0, "-0", 1, 14, -5788, 26.525, "26.525", "-26.525"];
  const falseValues = ["", null, undefined, "undefined", "null", "0-", {}, [1]];
  trueValues.forEach((v) => expect(isNumeric(v), `${v} is numeric`).toBeTruthy());
  falseValues.forEach((v) => expect(isNumeric(v), `"${v}" is not numeric`).toBeFalsy());
});
