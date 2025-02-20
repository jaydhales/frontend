import { EPage } from "@/lib/types";

export const Explainers = {
  [EPage.LEVERAGE]: {
    title: "Take on Leverage",
    description: `
      APE is a leveraged token that keeps your leverage steady, so gains grow exponentially as prices rise. No daily fees, no losses from market swings, and no forced selling.
Pay one fee upfront when you mint APE —then hold long-term for amplified growth.`
      .trim(),
  },
  [EPage.LIQUIDITY]: {
    title: "Provide Liquidity",
    description: `
      Deposit assets into vaults to mint TEA, our liquidity token, and earn fees from users taking on leverage. The protocol's permanent liquidity mining program also rewards LPers in elligible vaults with SIR tokens.
  No lock-ups —withdraw anytime.`
      .trim(),
  },
  [EPage.PORTFOLIO]: {
    title: "All Assets in One Place",
    description:
      `Track and manage your APE (leveraged) and TEA (liquidity) tokens here. Burn tokens to close positions or exit liquidity provision.
Liquidity providers in eligible vaults can claim SIR tokens and stake them to earn ETH rewards.`
      .trim(),
  },
  [EPage.STAKE]: {
    title: "Stake Your SIR",
    description: `By staking your SIR, you have a pro-rata claim on future protocol fees, paid out in ETH. Your yield will fluctuate depending on the volume and the amount of SIR staked.`
      .trim(),
  },
  [EPage.AUCTIONS]: {
    title: "Bid for Token Lots",
    description:
      "Help convert staker fees to ETH by bidding on token lots with WETH. Snap up underpriced tokens and profit from the difference. Auctions run daily, and a new auction for the same token can be started after a 1-week cooldown.",
  },
  [EPage.CREATE_VAULT]: {
    title: "Create New Vaults",
    description:
      "Choose your favorite tokens for going long and short, and the right leverage. Since this is constant true leverage, a smaller leverage amount than typical is necessary as gains compound quickly when prices rise. High leverage leads to high upfront fees when going long.",
  },
};
