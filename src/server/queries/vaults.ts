import type { vaultsQuery } from "@/../.graphclient";
import { graphqlClient } from "@/lib/graphqlClient";
import type { TAddressString } from "@/lib/types";
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

const userApePositionsQuery = gql`
  query getUserApePositions($user: Bytes) {
    userPositions(where: { user: $user }) {
      user
      balance
      APE
      vaultId
      debtToken
      debtSymbol
      collateralToken
      collateralSymbol
      leverageTier
    }
  }
`;

const userTeaPositionsQuery = gql`
  query getUserTeaPositions($user: Bytes) {
    userPositionsTeas(where: { user: $user }) {
      user
      vaultId
      balance
      debtToken
      debtSymbol
      collateralToken
      collateralSymbol
      leverageTier
    }
  }
`;
export const executeGetUserTeaPositions = async ({
  user,
}: {
  user: TAddressString;
}) => {
  const result = await graphqlClient.request(userTeaPositionsQuery, { user });
  return result as userTeaPositionsQuery;
};

export const executeGetUserApePositions = async ({
  user,
}: {
  user: TAddressString;
}) => {
  const result = await graphqlClient.request(userApePositionsQuery, { user });
  return result as userApePositionsQuery;
};

export const executeVaultsQuery = async () => {
  const result = await graphqlClient.request(vaults);
  return result as vaultsQuery;
};

export type userApePositionsQuery = {
  userPositions: {
    id: string;
    balance: bigint;
    APE: TAddressString;
    user: TAddressString;
    collateralSymbol: string;
    debtSymbol: string;
    collateralToken: TAddressString;
    debtToken: TAddressString;
    leverageTier: string;
    vaultId: string;
  }[];
};

export type userTeaPositionsQuery = {
  userPositionTeas: {
    id: string;
    balance: bigint;
    user: TAddressString;
    collateralSymbol: string;
    debtSymbol: string;
    collateralToken: TAddressString;
    debtToken: TAddressString;
    leverageTier: string;
    vaultId: string;
  }[];
};
