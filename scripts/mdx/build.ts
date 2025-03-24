import { existsSync, mkdirSync } from "fs"
import { readFile, writeFile } from "fs/promises"
import { glob } from "glob"
import matter from "gray-matter"
import path from "path"

interface Contents {
  body: string
  frontmatter: Record<string, any>
}
interface ContentsMap extends Record<string, Contents> {}

const MDX_PATH = path.join(process.cwd(), ".mdx")
const CONTENTS_PATH = path.join(process.cwd(), "contents")

async function build() {
  if (!existsSync(MDX_PATH)) mkdirSync(MDX_PATH)
  const filePaths = await glob("contents/*.mdx")

  const contentsMap: ContentsMap = {}
  const slugs: string[] = []
  await Promise.all(
    filePaths.map(async (filePath) => {
      const file = await readFile(filePath, "utf-8")
      const { content: body, data: frontmatter } = matter(file)
      const slug = filePath.replace("contents/", "").replace(".mdx", "")

      contentsMap[slug] = { body, frontmatter }
    })
  )

  try {
    await writeFile(
      path.join(MDX_PATH, "paths.json"),
      JSON.stringify({ slugs })
    )
    await writeFile(
      path.join(MDX_PATH, "contents.json"),
      JSON.stringify(contentsMap)
    )
  } catch (e) {
    console.log("Error: ", e)
  }
}

build()
