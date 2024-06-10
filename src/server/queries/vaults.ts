import type { getUserVaultsQuery, vaultsQuery } from "@/../.graphclient";
import { graphqlClient } from "@/lib/graphqlClient";
import { TAddressString } from "@/lib/types";
import { gql } from "graphql-request";
const vaults = gql`
  #graphql

  fragment VaultFields on Vault {
    debtToken
    debtSymbol
    collateralToken
    collateralSymbol
    vaultId
    leverageTier
  }

  query vaults {
    vaults {
      ...VaultFields
    }
  }
`;
const userVaults = gql`
  query getUserVaults($user: Bytes) {
    userPositions(where: { User: $user }) {
      User
      balance
      APE
      debtToken
      debtSymbol
      collateralToken
      collateralSymbol
      leverageTier
    }
  }
`;
export const executeGetUserVaultsQuery = async ({
  user,
}: {
  user: TAddressString;
}) => {
  const result = await graphqlClient.request(userVaults, { user });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const r = result as getUserVaultsQuery;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return r;
};

export const executeVaultsQuery = async () => {
  const result = await graphqlClient.request(vaults);
  return result as vaultsQuery;
};
