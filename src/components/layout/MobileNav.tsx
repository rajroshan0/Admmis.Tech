'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

import { Icon } from '@/components/ui/Icon'

type Props = {
  openLabel: string
  closeLabel: string
  menuLabel: string
  /** Server-rendered panel content: stays out of the client bundle and in the HTML for crawlers. */
  children: ReactNode
}

const FOCUSABLE = 'a[href], button:not([disabled])'

// The only client code in the header: an accessible disclosure.
// Escape closes and returns focus to the button, Tab cycles inside menu, page scroll is locked.
export function MobileNav({ openLabel, closeLabel, menuLabel, children }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const items = () =>
      [button.current, ...(panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter(
        (el): el is HTMLElement => el instanceof HTMLElement,
      )
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      } else if (e.key === 'Tab') {
        const list = items()
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    const wide = window.matchMedia('(min-width: 1024px)')
    const onWide = () => wide.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-12 items-center justify-center rounded-button border-2 border-fg text-fg lg:hidden"
      >
        <Icon name={open ? 'close' : 'menu'} />
      </button>
      <div
        ref={panel}
        id={panelId}
        role="region"
        aria-label={menuLabel}
        hidden={!open}
        onClick={(e) => e.target instanceof Element && e.target.closest('a') && setOpen(false)}
        className="panel-open fixed inset-x-0 bottom-0 top-header z-50 overflow-y-auto bg-surface px-gutter pb-8 pt-4 lg:hidden"
      >
        {children}
      </div>
    </>
  )
}
