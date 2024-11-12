import { beforeAll, expect, test } from "vitest";
import dotenv from "dotenv";
import useCalculateVaultHealth from "./useCalculateVaultHealth";
beforeAll(() => {
  dotenv.config();
});

test("Testing calculating vault health.", () => {
  const leverageTier = 0,
    teaCollateral = 220n,
    apeCollateral = 100n;
  expect(
    useCalculateVaultHealth({
      leverageTier,
      teaCollateral,
      apeCollateral,
      isApe: true,
    }).variant,
  ).toBe("yellow");
});

test("Testing calculating tea side.", () => {
  const leverageTier = -1,
    apeCollateral = 73381955552671381n,
    teaCollateral = 49304565809899447n,
    isApe = true;
  expect(
    useCalculateVaultHealth({
      leverageTier,
      teaCollateral,
      apeCollateral,
      isApe,
    }).variant,
  ).toBe("red");
});
