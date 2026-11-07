import type { Metadata } from 'next'

import { CtaBandBlock, HeroBlock } from '@/components/blocks'
import { Callout, PostCard, Section } from '@/components/ui'
import { listPosts } from '@/lib/routes/cms-lists'
import { pathFor } from '@/lib/routes/path'
import {
  loadPage,
  pageMeta,
  staticEn,
  type LocaleParams,
} from '@/app/(site)/[locale]/_templates/load'

// Blog hub. No pagination at launch (sitemap rule 8). With 0 posts: empty state, noindex.
export const dynamicParams = false
export const generateStaticParams = staticEn

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, pages } = await loadPage(params)
  return pageMeta(locale, '/blog', pages.blog.seoTitle, pages.blog.metaDescription)
}

export default async function BlogPage({ params }: LocaleParams) {
  const { locale, pages } = await loadPage(params)
  const b = pages.blog
  const posts = await listPosts()
  return (
    <>
      <HeroBlock
        data={{ variant: 'plain', eyebrow: b.eyebrow, heading: b.heading, subheading: b.sub }}
      />
      <Section tone="bg">
        {posts.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <PostCard
                  post={{
                    href: pathFor(locale, `/blog/${p.slug}`),
                    title: p.title,
                    excerpt: p.excerpt,
                    tag: p.tag,
                    date: p.date,
                    readTime: p.readTime,
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-[40rem]">
            <Callout title={b.emptyTitle}>{b.emptyText}</Callout>
          </div>
        )}
      </Section>
      <CtaBandBlock
        data={{
          heading: b.ctaHeading,
          text: b.ctaText,
          primary: { label: pages.ui.getQuote, href: pathFor(locale, '/contact') },
        }}
      />
    </>
  )
}
