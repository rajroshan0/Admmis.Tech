import { Price } from '@/components/ui'

// Price box for the pricing teaser. No price rows exist until Roshan approves pricing (A6),
// so it shows the fallback label, never a number.
export function PriceAside({ label }: { label: string }) {
  return (
    <div className="rounded-card border border-line bg-bg p-5">
      <Price quoteLabel={label} className="text-h3" />
    </div>
  )
}
