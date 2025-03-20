import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { mdx } from "@/utils/mdx"
import { readFileSync } from "fs"

export const getStaticProps = (async ({ params }) => {
  const path = ["/contents", ...(params?.slug ?? [])].join("/") + ".mdx"
  const content = readFileSync(process.cwd() + path)
  const source = await mdx(content.toString())
  return {
    props: {
      source: source,
    },
  }
}) satisfies GetStaticProps<{
  source: MDXRemoteSerializeResult
}>

export const getStaticPaths = (async ({}) => {
  // const fullPaths = getRecursivePaths(process.cwd() + "/contents")
  return {
    paths: [
      {
        params: {
          // TODO: get paths from contents
          slug: ["sample"],
        },
      },
    ],
    fallback: false,
  }
}) satisfies GetStaticPaths

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<PageProps> = ({ source, ...rest }) => {
  return <MDXRemote {...source} />
}

export default Page
