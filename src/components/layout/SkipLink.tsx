// First focusable element on the page. Tokens only; visible on focus.
export function SkipLink({ label, targetId = 'main' }: { label: string; targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-60 focus:rounded-button focus:bg-fg focus:px-4 focus:py-3 focus:font-bold focus:text-bg"
    >
      {label}
    </a>
  )
}
