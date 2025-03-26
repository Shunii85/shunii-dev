import { Header } from "@/components/layouts/header"
import { FC, PropsWithChildren } from "react"

export const TopLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="px-16">{children}</main>
      <footer className="bg-indigo-900 p-8">
        Copyright © 2024 Shuta Yanagawa
      </footer>
    </>
  )
}
