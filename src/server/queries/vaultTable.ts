import { vaultsQuery } from "@/../.graphclient";
import { graphqlClient } from "@/lib/graphqlClient";
import { gql } from "graphql-request";
const vaults = gql`
  #graphql
  query vaults {
    vaults {
      debtToken
      debtSymbol
      collateralToken
      collateralSymbol
      vaultId
      leverageTier
    }
  }
`;

export const executeVaultsQuery = async () => {
  const result = await graphqlClient.request(vaults);
  return result as vaultsQuery;
};
