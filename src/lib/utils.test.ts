import { expect, test } from "vitest";
import { add, getLeverageRatio, getVaultAddress } from "./utils";

test("Test utils add function.", () => {
  expect(add(1, 2)).toBe(3);
});

test("Test calculate leverage tier ratio.", () => {
  expect(getLeverageRatio(-1)).toBe(1.5);
});

test("Test if vaultId gets proper contract address.", () => {
  expect(
    getVaultAddress({
      vaultId: 1,
      vaultAddress: "0x41219a0a9C0b86ED81933c788a6B63Dfef8f17eE",
    }),
  ).toBe("0x6F65c6A2177AF9776C0d0104cf9171E4F9F7CA94");
});
