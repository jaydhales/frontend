import { expect, test } from "vitest";
import { add } from "./utils";

test("Test utils add function", () => {
  expect(add(1, 2)).toBe(3);
});
