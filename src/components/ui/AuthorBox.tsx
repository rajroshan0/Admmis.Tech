import { Avatar, type Photo } from './Initials'

export function AuthorBox({
  label,
  name,
  role,
  bio,
  photo,
  link,
}: {
  /** aria-label, e.g. "About the author" */
  label: string
  name: string
  role?: string
  bio?: string
  photo?: Photo
  link?: { label: string; href: string }
}) {
  return (
    <aside aria-label={label} className="flex gap-4 rounded-card border border-line bg-surface p-5">
      <Avatar name={name} photo={photo} size="size-14 flex-none" sizes="56px" round />
      <div>
        <p className="font-bold">{name}</p>
        {role ? <p className="text-small text-muted">{role}</p> : null}
        {bio ? <p className="mt-2 text-card text-muted">{bio}</p> : null}
        {link ? (
          <a
            href={link.href}
            className="mt-2 inline-flex min-h-11 items-center font-bold underline underline-offset-4"
          >
            {link.label}
          </a>
        ) : null}
      </div>
    </aside>
  )
}
