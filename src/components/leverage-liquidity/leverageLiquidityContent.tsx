import MintFormProvider from "@/components/providers/mintFormProvider";
import Pagination from "@/components/shared/pagination";
import { Card } from "@/components/ui/card";
import React from "react";
import type { TVaults } from "@/lib/types";
import { Container } from "@/components/ui/container";
import { MintForm } from "./mintForm/mint-form";
import VaultTable from "./vaultTable/vaultTable";

export default function LeverageLiquidityContent({
  vaultsQuery,
  isApe,
}: {
  vaultsQuery: TVaults;
  form: React.ReactNode;
  isApe: boolean;
}) {
  return (
    <Container>
      <div className="grid w-full gap-x-[16px] gap-y-4 lg:grid-cols-2">
        <MintFormProvider>
          <MintForm vaultsQuery={vaultsQuery} isApe={isApe} />
          <Card>
            <div className="flex h-full flex-col justify-between">
              <VaultTable vaultQuery={vaultsQuery} />
              <Pagination
                max={Math.ceil((vaultsQuery?.vaults.length ?? 0) / 10)}
              />
            </div>
          </Card>
        </MintFormProvider>
      </div>
    </Container>
  );
}
