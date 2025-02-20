import { EPage } from "@/lib/types";

export const Explainers = {
  [EPage.LEVERAGE]: {
    title: "Take on Leverage",
    description:
      "APE is a leveraged token that keeps your leverage steady, so gains grow exponentially as prices rise. No daily fees, no losses from market swings, and no forced selling.\n Pay one fee upfront when you create APE—then hold long-term for amplified growth."
  },
  [EPage.LIQUIDITY]: {
    title: "Provide Liquidity",
    description:
      "Liquidity providers (LPers) are essential to our protocol, enabling true constant leverage. To participate, LPers mint TEA, our liquidity token, by providing assets to the vaults. They earn fees from users taking on leverage, as well as from other LPs minting or burning TEA. Eligible vaults also receive SIR rewards.",
  },
  [EPage.PORTFOLIO]: {
    title: "All Assets in One Place",
    description:
      "Manage your SIR protocol positions here. View your APE and TEA tokens, and burn them to close positions or exit liquidity provision. You can also stake or unstake SIR to earn or stop earning ETH dividends, and claim SIR rewards if you're an eligible liquidity provider.",
  },
  [EPage.STAKE]: {
    title: "Stake Your SIR",
    description:
      "By staking your SIR, you have a pro-rata claim on future protocol fees, paid out in ETH. The amount will depend on activity on SIR and which vaults are most active.",
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
