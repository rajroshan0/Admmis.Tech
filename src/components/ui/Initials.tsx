import Image from 'next/image'

export type Photo = { src: string; width: number; height: number; alt: string }

/** First letter of up to two words, by grapheme so Devanagari clusters stay whole. */
export function initialsOf(name: string): string {
  const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => [...seg.segment(w)][0]?.segment ?? '')
    .join('')
}

/** Photo, or a navy tile with amber initials when there is none (decorative; the name sits beside it). */
export function Avatar({
  name,
  photo,
  size,
  sizes,
  className = '',
  round,
}: {
  name: string
  photo?: Photo
  /** CSS size class, e.g. "size-14" */
  size?: string
  sizes: string
  className?: string
  round?: boolean
}) {
  if (photo) {
    return (
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        sizes={sizes}
        className={`${size ?? 'w-full'} aspect-square ${round ? 'rounded-chip' : 'rounded-card'} object-cover ${className}`}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={`${size ?? 'w-full'} grid aspect-square place-items-center ${round ? 'rounded-chip' : 'rounded-card'} bg-fg text-[2rem] font-bold text-accent ${className}`}
    >
      {initialsOf(name)}
    </span>
  )
}
