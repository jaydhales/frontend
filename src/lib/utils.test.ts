import { expect, test } from "vitest";
import {
  add,
  getLeverageRatio,
  getApeAddress,
  calculateVaultFee,
} from "./utils";

test("Test utils add function.", () => {
  expect(add(1, 2)).toBe(3);
});

test("Test calculate leverage tier ratio.", () => {
  expect(getLeverageRatio(-1)).toBe(1.5);
});

test("Test calculate leverage tier ratio.", () => {
  expect(calculateVaultFee(0.5, 1.5)).toBe(0.2);
});
test("Test if getApeAddress gets proper contract address.", () => {
  expect(
    getApeAddress({
      vaultId: 1,
      vaultAddress: "0xa51807d5a12E7e78148c66dC4851CD33EEd1FDfD",
      apeHash:
        "0xa46131919dce26b89fa279578c126634abe8d3a1a5924b214543dfa2e12b3b86",
    }),
  ).toBe("0x067Dd26fecdf6659879D0a1a4C4DFa735413339D".toLowerCase()); // FOR SOME REASON VITE DOESN"T WORK WITH getAddress
});
