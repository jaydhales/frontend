import MintFormProvider from "@/components/providers/mintFormProvider";
import { MintForm } from "@/components/shared/mintForm/mint-form";
import Pagination from "@/components/shared/pagination";
import { Card } from "@/components/ui/card";
import React from "react";
import type { TVaults } from "@/lib/types";
import VaultTable from "./vaultTable/vaultTable";
import { Container } from "../ui/container";

export default function LeverageContent({
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
