import { expect, test } from "vitest";
import { add, getLeverageRatio } from "./utils";

test("Test utils add function", () => {
  expect(add(1, 2)).toBe(3);
});

test("Test calculate leverage tier ratio", () => {
  expect(getLeverageRatio(-1)).toBe(1.5);
});
