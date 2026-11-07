// The component never formats money: `amount` arrives as a ready string from the price collection (server-side).
// No amount (no price row, or a quote-only package) shows `quoteLabel`, never a zero.
type Props = {
  /** e.g. "From" */
  prefix?: string
  /** e.g. "NPR 25,000" */
  amount?: string
  /** second currency, e.g. "USD 190" */
  secondary?: string
  /** e.g. "per month" */
  unit?: string
  /** shown when there is no amount: "Price on request" or "Quote only" */
  quoteLabel: string
  className?: string
}

export function Price({ prefix, amount, secondary, unit, quoteLabel, className = '' }: Props) {
  if (!amount) {
    return <span className={`font-bold text-fg ${className}`}>{quoteLabel}</span>
  }
  return (
    <span className={`flex flex-wrap items-baseline gap-x-2 ${className}`}>
      {prefix ? <span className="text-small text-muted">{prefix}</span> : null}
      <span className="text-h3 font-bold text-fg">{amount}</span>
      {secondary ? <span className="text-small text-muted">({secondary})</span> : null}
      {unit ? <span className="text-small text-muted">{unit}</span> : null}
    </span>
  )
}
