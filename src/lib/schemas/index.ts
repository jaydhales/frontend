import { z } from "zod";
const linkSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const CreateVaultInputValues = z.object({
  longToken: z.string(),
  versusToken: z.string(),
  leverageTier: z.string(),
});

export const assetSchema = z.object({
  decimals: z.number().int().positive(),
  description: z.string(),
  explorer: z.string().url(),
  id: z.string().length(42), // Ethereum addresses are 42 characters long
  links: z.array(linkSchema).optional(),
  name: z.string(),
  status: z.enum(["active", "inactive"]),
  symbol: z.string(),
  tags: z.array(z.string()).optional(),
  type: z.enum(["ERC20", "ERC721", "ERC1155"]), // Assuming type could be one of these common Ethereum token standards
  website: z.string().url(),
});
