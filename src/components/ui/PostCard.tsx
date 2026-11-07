import Image from 'next/image'

import { Card, CardLink } from './Card'
import type { Photo } from './Initials'

export type PostCardData = {
  href: string
  title: string
  excerpt?: string
  tag?: string
  /** pre-formatted by the server, e.g. "7 Nov 2026" */
  date?: string
  /** e.g. "5 min read" */
  readTime?: string
  cover?: Photo
}

/** Whole card links via the title. `large`: row layout from 768 px. Missing cover = the CSS cover. */
export function PostCard({
  post,
  large,
  headingLevel = 3,
  priority,
}: {
  post: PostCardData
  large?: boolean
  headingLevel?: 2 | 3
  /** featured card above the fold only */
  priority?: boolean
}) {
  const Tag = `h${headingLevel}` as 'h2' | 'h3'
  return (
    <Card
      interactive
      flush
      className={`h-full overflow-hidden ${large ? 'md:grid md:grid-cols-[5fr_7fr]' : ''}`}
    >
      <div className="cover aspect-[16/10] w-full">
        {post.cover ? (
          <Image
            src={post.cover.src}
            width={post.cover.width}
            height={post.cover.height}
            alt={post.cover.alt}
            sizes={large ? '(min-width: 768px) 40vw, 100vw' : '(min-width: 1024px) 360px, 100vw'}
            className="size-full object-cover"
            {...(priority ? { preload: true, fetchPriority: 'high' as const } : {})}
          />
        ) : null}
      </div>
      <div className="p-5 lg:p-6">
        {post.tag ? (
          <p className="mb-2 inline-block rounded-chip bg-accent px-3 py-0.5 text-small font-bold text-on-accent">
            {post.tag}
          </p>
        ) : null}
        <Tag className={`font-bold ${large ? 'text-h2' : 'text-h3'}`}>
          <CardLink href={post.href}>{post.title}</CardLink>
        </Tag>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-3 text-card text-muted">{post.excerpt}</p>
        ) : null}
        {post.date || post.readTime ? (
          <p className="mt-3 text-small text-muted">
            {[post.date, post.readTime].filter(Boolean).join(' · ')}
          </p>
        ) : null}
      </div>
    </Card>
  )
}
