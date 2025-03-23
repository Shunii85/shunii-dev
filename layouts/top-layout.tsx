import { LinkButton } from "@/components/link-button"
import { FC, PropsWithChildren } from "react"

export const TopLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="px-16">
      <header className="fixed top-0 right-0 left-0 flex items-center justify-between bg-indigo-900 px-16 py-4 font-bold text-slate-300">
        <h1 className="text-2xl tracking-tight">shunii .dev</h1>
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
      <main className="mt-20">{children}</main>
      <footer>Copyright © 2024 Shuta Yanagawa</footer>
    </div>
  )
}
