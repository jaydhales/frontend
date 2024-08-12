"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Container } from "../ui/container";
import { Card } from "../ui/card";
import VaultTable from "./vaultTable/vaultTable";
import MintFormProvider from "../providers/mintFormProvider";
import type { TVaults } from "@/lib/types";
import Pagination from "../shared/pagination";
import { MintForm } from "../shared/mintForm/mint-form";

export default function MintTabs({
  vaultsQuery,
  isApe,
}: {
  vaultsQuery: TVaults;
  form: React.ReactNode;
  isApe: boolean;
}) {
  return (
    <Tabs defaultValue="mint">
      <div className="flex justify-center">
        <TabsList defaultValue={"mint"}>
          <TabsTrigger value={"mint"}>Mint</TabsTrigger>
          <TabsTrigger value={"burn"}>Burn</TabsTrigger>
        </TabsList>
      </div>
      <br />
      <TabsContent value="mint">
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
      </TabsContent>
      {/*  */}
      <TabsContent value="burn"></TabsContent>
    </Tabs>
  );
}
