import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CtaBandBlock } from '@/components/blocks'
import { Section } from '@/components/ui'
import { DEFAULT_LOCALE } from '@/lib/i18n/config'
import { listPosts } from '@/lib/routes/cms-lists'
import { pathFor } from '@/lib/routes/path'
import { loadPage, pageMeta, type LocaleParams } from '@/app/(site)/[locale]/_templates/load'

// Article page. No article exists yet, so there are no static params and every slug is a 404.
type Props = { params: Promise<{ locale: string; slug: string }> }
export const dynamicParams = false

export async function generateStaticParams() {
  return (await listPosts()).map((p) => ({ locale: DEFAULT_LOCALE, slug: p.slug }))
}

async function load(params: Props['params']) {
  const { slug } = await params
  const base = await loadPage(params as LocaleParams['params'])
  const post = (await listPosts()).find((p) => p.slug === slug)
  if (!post) notFound()
  return { ...base, post }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, post } = await load(params)
  return pageMeta(locale, `/blog/${post.slug}`, post.title, post.excerpt)
}

export default async function ArticlePage({ params }: Props) {
  const { locale, pages, post } = await load(params)
  return (
    <>
      <Section tone="bg">
        <article className="max-w-[40rem]">
          <h1 className="mb-3 text-display font-bold">{post.title}</h1>
          <p className="mb-6 text-small text-muted">
            {[post.date, post.readTime].filter(Boolean).join(' · ')}
          </p>
          {post.body.map((para, i) => (
            <p key={i} className="mb-4 text-lead">
              {para}
            </p>
          ))}
        </article>
      </Section>
      <CtaBandBlock
        data={{
          heading: pages.blog.ctaHeading,
          text: pages.blog.ctaText,
          primary: { label: pages.ui.getQuote, href: pathFor(locale, '/contact') },
        }}
      />
    </>
  )
}
