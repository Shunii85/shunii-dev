import type { ContentsMap, FrontMatter } from "mdx"
import { existsSync, mkdirSync } from "fs"
import { readFile, writeFile } from "fs/promises"
import { glob } from "glob"
import matter from "gray-matter"
import path from "path"

const MDX_PATH = path.join(process.cwd(), ".mdx")

async function build() {
  if (!existsSync(MDX_PATH)) mkdirSync(MDX_PATH)
  const filePaths = await glob("contents/*.mdx")

  const contentsMap: ContentsMap = {}
  const slugs: string[] = []
  await Promise.all(
    filePaths.map(async (filePath) => {
      const file = await readFile(filePath, "utf-8")
      const { content: body, data } = matter(file)
      const {
        title = "",
        description = "",
        date = ""
      } = data as Partial<FrontMatter>
      const slug = filePath.replace("contents/", "").replace(".mdx", "")

      slugs.push(slug)
      contentsMap[slug] = { body, frontmatter: { title, description, date } }
    })
  )

  try {
    await writeFile(path.join(MDX_PATH, "slugs.json"), JSON.stringify(slugs))
    await writeFile(
      path.join(MDX_PATH, "contents.json"),
      JSON.stringify(contentsMap)
    )
  } catch (e) {
    console.log("Error: ", e)
  }
}

build()
