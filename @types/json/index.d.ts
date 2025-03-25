declare module "mdx" {
  type Slugs = string[]

  const slugs: Slugs

  interface FrontMatter {
    title: string
    description: string
    date: string
  }

  interface Content {
    body: string
    frontmatter: FrontMatter
  }

  type ContentsMap = Record<string, Content>

  const contentsMap: ContentsMap
}
