import { vaultsQuery } from "@/../.graphclient";
import { graphqlClient } from "@/lib/graphqlClient";
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

export const executeVaultsQuery = async () => {
  const result = await graphqlClient.request(vaults);
  return result as vaultsQuery;
};
