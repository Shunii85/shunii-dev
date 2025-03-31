import Link from "next/link"
import { FC, PropsWithChildren } from "react"

interface LinkButtonProps extends PropsWithChildren {
  className?: string
  href: string
}

export const LinkButton: FC<LinkButtonProps> = ({
  className,
  children,
  href
}) => {
  return (
    <Link href={href}>
      <button className={`rounded-full px-6 py-2 duration-500 ${className}`}>
        {children}
      </button>
    </Link>
  )
}
