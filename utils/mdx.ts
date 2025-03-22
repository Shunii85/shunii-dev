import { serialize } from "next-mdx-remote/serialize"

export const mdx = async (source: string) => {
  const mdxSource = await serialize(source, { parseFrontmatter: true })
  return mdxSource
}
