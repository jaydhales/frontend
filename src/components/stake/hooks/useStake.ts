'use client'

import { useSimulateContract } from "wagmi"
import { SirContract } from "@/contracts/sir"
import type { TAddressString } from "@/lib/types"
import { parseUnits } from "viem"
import { z } from "zod"
import { useEffect } from "react"

interface Props {
    amount: bigint | undefined
}

export const useStake = ({amount} : Props)  => {
    return {};
}