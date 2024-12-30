import { expect, test } from "vitest";
import { calculateApeVaultFee } from "./calculations";
import { L_FEE } from "@/data/constants";

test("Test calculate leverage tier ratio.", () => {
  expect(calculateApeVaultFee(-1, L_FEE)).toBe(0.3055555555555555);
});
