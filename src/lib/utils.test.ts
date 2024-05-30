import { expect, test } from "vitest";
import { add, getLeverageRatio, getVaultAddress } from "./utils";

test("Test utils add function.", () => {
  expect(add(1, 2)).toBe(3);
});

test("Test calculate leverage tier ratio.", () => {
  expect(getLeverageRatio(-1)).toBe(1.5);
});

test("Test if getVaultAddress gets proper contract address.", () => {
  expect(
    getVaultAddress({
      vaultId: 0,
      vaultAddress: "0x01c93598EeC9131C05a2450Cd033cbd8F82da31e",
      apeHash:
        "0xcf39e7ac6f3c12d813a3307776916d753675afc06b9b863f743ed27a77d1c064",
    }),
  ).toBe("0x02e9F4bB019f5513CFaF87dAe7F6b11b29007953".toLowerCase()); // FOR SOME REASON VITE DOESN"T WORK WITH getAddress
});
