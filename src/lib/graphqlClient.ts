import { GRAPHQL_URL } from "@/data/serverConstants";
import { GraphQLClient } from "graphql-request";
console.log(GRAPHQL_URL, "URL");
export const graphqlClient = new GraphQLClient(GRAPHQL_URL);
