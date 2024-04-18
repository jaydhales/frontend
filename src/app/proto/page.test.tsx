import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import EvmProvider from "@/components/providers/evm-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("App Router: Works with Server Components", () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <EvmProvider cookie={null}>
        <Page />
      </EvmProvider>
    </QueryClientProvider>,
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "PROTOTYPE" }),
  ).toBeDefined();
});
