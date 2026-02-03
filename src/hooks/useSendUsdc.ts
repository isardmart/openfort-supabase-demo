import { useCallback } from 'react'
import { parseUnits } from 'viem'
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'

// Configurable via env var, defaults to testnet token (18 decimals)
const tokenAddress = (import.meta.env.VITE_TRANSFER_TOKEN_ADDRESS) as `0x${string}`
const tokenDecimals = Number(import.meta.env.VITE_TRANSFER_TOKEN_DECIMALS || 18)

const erc20TransferAbi = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
  },
] as const

export function useSendUsdc() {
  const { address } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  const sendUsdc = useCallback(
    (to: `0x${string}`, amount: string) => {
      if (!address) throw new Error('Wallet not connected')

      const units = parseUnits(amount, tokenDecimals)

      writeContract({
        address: tokenAddress,
        abi: erc20TransferAbi,
        functionName: 'transfer',
        args: [to, units],
      })
    },
    [address, writeContract]
  )

  return {
    sendUsdc,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}