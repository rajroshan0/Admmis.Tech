'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import type { GalleryLabels } from './types'
import type { Photo } from '@/components/ui/Initials'

// Only client part of the gallery: native <dialog> (Esc, focus trap and focus return come from the browser).
export function GalleryViewer({ images, labels }: { images: Photo[]; labels: GalleryLabels }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLAnchorElement | null>(null)
  const [index, setIndex] = useState(0)
  const current = images[index]
  const step = (d: number) => setIndex((i) => (i + d + images.length) % images.length)
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        {images.map((img, i) => (
          <li key={img.src}>
            <a
              href={img.src}
              aria-label={labels.open.replace('{alt}', img.alt)}
              onClick={(e) => {
                e.preventDefault()
                opener.current = e.currentTarget
                setIndex(i)
                dialog.current?.showModal()
              }}
              className="block min-h-12 w-full overflow-hidden rounded-card border border-line"
            >
              <Image
                src={img.src}
                width={img.width}
                height={img.height}
                alt=""
                loading="lazy"
                sizes="(min-width: 1024px) 380px, 45vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </a>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        aria-label={labels.dialog}
        onClose={() => opener.current?.focus()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') step(-1)
          if (e.key === 'ArrowRight') step(1)
        }}
        className="m-auto max-h-[92vh] w-[min(96vw,64rem)] rounded-card bg-surface p-3 text-fg backdrop:bg-black/70"
      >
        {current ? (
          <Image
            src={current.src}
            width={current.width}
            height={current.height}
            alt={current.alt}
            sizes="96vw"
            className="mx-auto max-h-[72vh] w-auto object-contain"
          />
        ) : null}
        <div className="mt-3 flex flex-wrap justify-between gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="min-h-12 rounded-button border-2 border-fg px-5 font-bold"
          >
            {labels.previous}
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="min-h-12 rounded-button border-2 border-fg px-5 font-bold"
          >
            {labels.next}
          </button>
          <button
            type="button"
            autoFocus
            onClick={() => dialog.current?.close()}
            className="min-h-12 rounded-button border-2 border-fg bg-fg px-5 font-bold text-surface"
          >
            {labels.close}
          </button>
        </div>
      </dialog>
    </>
  )
}
