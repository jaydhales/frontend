import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { TokenDisplay } from "./token-display";
import { parseUnits } from "viem";
test("App Router: Works with Server Components", () => {
  render(
    <TokenDisplay
      amount={parseUnits("1", 12)}
      decimals={12}
      unitLabel={"SIR"}
    />,
  );

  const h3 = screen.getByRole("heading", { level: 3 });
  expect(h3).toBeDefined();
  expect(screen.findByText("100 SIR")).to.exist;
});
