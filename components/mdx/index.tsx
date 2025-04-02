import { MDXRemoteProps } from "next-mdx-remote"

export const mdxComponents: MDXRemoteProps["components"] = {
  h1: ({ children, ...rest }) => (
    <h1 className="mb-4 text-4xl font-bold" {...rest}>
      # {children}
    </h1>
  ),
  h2: ({ children, ...rest }) => (
    <>
      <h2 className="mb-4 text-3xl font-semibold" {...rest}>
        ## {children}
      </h2>
      <hr className="mb-4 rounded-full border-2 text-slate-500" />
    </>
  ),
  h3: ({ children, ...rest }) => (
    <h3 className="mb-4 text-2xl font-semibold" {...rest}>
      ### {children}
    </h3>
  )
}
