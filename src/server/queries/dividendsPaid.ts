import { graphqlClient } from "@/lib/graphqlClient";
import { gql } from "graphql-request";

const query = gql`
  query getDividendsPaid($timestamp: BigInt!) {
    dividends(where: { timestamp_gt: $timestamp }) {
      ethAmount
      timestamp
      stakedAmount
    }
  }
`;

export const executeGetDividendsPaid = async ({
  timestamp,
}: {
  timestamp: number;
}) => {
  const result = await graphqlClient.request(query, { timestamp });
  return result;
};
