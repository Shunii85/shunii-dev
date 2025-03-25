import { memo } from "react"
import Link from "next/link"
import { LinkButton } from "../link-button"

export const Header = memo(() => {
  return (
    <header className="sticky top-0 right-0 z-10 flex items-center justify-between bg-indigo-900 px-16 py-4 font-bold text-slate-300">
      <h1 className="text-2xl tracking-tight">
        <Link href="/">shunii .dev</Link>
      </h1>
      <nav>
        <ul className="hidden gap-1.5 sm:flex">
          <li>
            <LinkButton href="/">HOME</LinkButton>
          </li>
          <li>
            <LinkButton href="/blog">BLOG</LinkButton>
          </li>
          <li>
            <LinkButton href="/status">ABOUT</LinkButton>
          </li>
        </ul>
      </nav>
    </header>
  )
})
