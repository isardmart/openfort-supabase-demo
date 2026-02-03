import { TruncateData } from '@/src/components/ui/TruncateData'
import { useSendUsdc } from '@/src/hooks/useSendUsdc'

export function TransferButton() {
  const { sendUsdc, hash, isPending, isConfirming, isConfirmed, error } =
    useSendUsdc()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const to = form.recipient.value as `0x${string}`
    const amount = form.amount.value
    sendUsdc(to, amount)
  }

  return (
    <div>
      <h2>Transfer Tokens</h2>
      <p className="mb-2 text-zinc-400 text-sm">
        Send tokens to another address.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="recipient"
          placeholder="Recipient address (0x...)"
          className="grow"
          required
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          className="grow"
          required
        />
        <button className="btn" disabled={isPending || isConfirming}>
          {isPending ? 'Preparing...' : isConfirming ? 'Confirming...' : 'Send'}
        </button>
      </form>
      {isConfirmed && (
        <p className="mt-2 text-green-400 text-sm">Transfer confirmed!</p>
      )}
      <TruncateData data={hash} />
      <TruncateData data={error?.message} className="text-red-400" />
    </div>
  )
}
