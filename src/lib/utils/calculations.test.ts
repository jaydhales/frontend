import { expect, test } from "vitest";
import { calculateApeVaultFee, calculateApr } from "./calculations";
import { parseUnits } from "viem";

test("Test calculate leverage tier ratio.", () => {
  expect(calculateApeVaultFee(-1)).toBe(0.243856332703);
});

test("APR Calculation", () => {
  expect(
    calculateApr({
      amountOfStakedSir: parseUnits("127000", 12),
      ethDividends: 112531969309462000000000000000000n,
      sirUsdPrice: "0.00016542597",
      ethUsdPrice: "2730.6095296423",
    }),
  ).toBe(0n);
});
