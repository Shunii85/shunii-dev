import {
  ComponentPropsWithRef,
  FC,
  memo,
  PropsWithRef,
  Ref,
  useEffect,
  useRef,
  useState
} from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { LinkButton } from "@/components/link-button"
import { Drawer } from "vaul"

type Scroll = "up" | "down"
const linkInfos = [
  { label: "HOME", href: "/" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT", href: "/status" }
]

export const Header: FC = memo(() => {
  const headerRef = useRef<HTMLHeadingElement>(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState<Scroll>()
  const [y, setY] = useState<number>(0)
  const isDisplay = scroll === "up" || scroll === undefined

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const { scrollY } = window
      setY(scrollY)
      setScroll(() => {
        if (scrollY < y) return "up"
        return "down"
      })
    })
    return () => {
      window.removeEventListener("scroll", () => {
        setY(window.scrollY)
      })
    }
  })

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky px-2 py-3 duration-700 ease-in-out sm:px-6 sm:py-5 ${isDisplay ? "translate-y-0" : "-translate-y-32"}`}
      >
        <div className="z-10 flex max-h-18 items-center justify-between rounded-full bg-indigo-900 px-10 py-2 font-bold text-slate-300 sm:px-16 sm:py-5">
          <h1 className="text-xl tracking-tight sm:text-2xl">
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
        </div>
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
