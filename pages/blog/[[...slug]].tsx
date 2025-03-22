import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from "next"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { mdx } from "@/utils/mdx"
import { readFileSync } from "fs"
import { getRecursivePaths } from "@/utils"

export const getStaticProps = (async ({ params }) => {
  const path = ["/contents", ...(params?.slug ?? ["index"])].join("/") + ".mdx"
  try {
    const content = readFileSync(process.cwd() + path)
    const source = await mdx(content.toString())
    return {
      props: {
        source
      }
    }
  } catch {
    return {
      notFound: true
    }
  }
}) satisfies GetStaticProps<{
  source: MDXRemoteSerializeResult
}>

export const getStaticPaths = (async ({}) => {
  const paths = getRecursivePaths(process.cwd() + "/contents").map((path) => {
    const relativePath = path
      .replace(process.cwd() + "/contents/", "")
      .replace(".mdx", "")
      .split("/")
    return { params: { slug: relativePath } }
  })
  return {
    paths: [...paths, { params: { slug: undefined } }],
    fallback: false
  }
}) satisfies GetStaticPaths

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<PageProps> = ({ source }) => {
  return source ? <MDXRemote {...source} /> : null
}

export default Page
