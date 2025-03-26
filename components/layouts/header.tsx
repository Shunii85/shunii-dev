import { FC, memo, useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { LinkButton } from "@/components/link-button"
import { Drawer } from "vaul"

const linkInfos = [
  { label: "HOME", href: "/" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT", href: "/status" }
]

export const Header: FC = memo(() => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="sticky top-0 right-0 z-10 flex h-18 max-h-18 items-center justify-between bg-indigo-900 px-16 font-bold text-slate-300">
        <h1 className="text-2xl tracking-tight">
          <Link href="/">shunii .dev</Link>
        </h1>
        <nav>
          <ul className="flex gap-1.5 text-sm">
            {linkInfos.map(({ label, href }) => (
              <li key={label} className="hidden sm:inline-flex">
                <LinkButton className="hover:bg-indigo-950" href={href}>
                  {label}
                </LinkButton>
              </li>
            ))}
            <li className="sm:hidden">
              <MenuButton onClick={() => setOpen(true)} />
            </li>
          </ul>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
})

interface MenuButtonProps {
  onClick: () => void
}
const MenuButton: FC<MenuButtonProps> = memo(({ onClick }) => {
  return (
    <button
      className="rounded-md p-3 transition active:scale-150 sm:hidden"
      onClick={onClick}
    >
      <Menu />
    </button>
  )
})

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}
const MobileMenu: FC<MobileMenuProps> = memo(({ open, onClose }) => {
  return (
    <Drawer.Root direction="right" open={open} onClose={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Drawer.Content className="fixed top-8 right-2 z-20 flex w-52 outline-none">
          <div className="flex grow flex-col rounded-[16px] bg-zinc-50 p-5">
            <ul className="flex flex-col gap-4 font-semibold text-slate-800">
              <Drawer.Title className="hidden">Links</Drawer.Title>
              <Drawer.Description className="hidden">
                These are links to each contents
              </Drawer.Description>
              {linkInfos.map(({ label, href }) => (
                <li key={label} onClick={onClose}>
                  <LinkButton className="hover:bg-gray-400" href={href}>
                    {label}
                  </LinkButton>
                </li>
              ))}
            </ul>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
})
MobileMenu.displayName = "MobileMenu"
