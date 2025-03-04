import { expect, test } from "vitest";
import { formatSmallNumber } from ".";

test("Test Formatting Small Numbers", () => {
  expect(formatSmallNumber(0.00013)).toBe("0.0v213");
  expect(formatSmallNumber(0.00001344)).toBe("0.0v3134");
  expect(formatSmallNumber(0.00001344898989)).toBe("0.0v3134");
  expect(formatSmallNumber(0.000000512222)).toBe("0.0v6512");
});
