import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from "next"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { mdxComponents } from "@/components/mdx"
import { mdx } from "@/utils/mdx"
import { contentsMap, slugs } from "mdx"
import { isArray } from "@/utils"

export const getStaticProps = (async ({ params }) => {
  const path = isArray(params?.slug)
    ? params.slug.join("/")
    : (params?.slug ?? "")
  try {
    const { body } = contentsMap[path]
    const source = await mdx(body)
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

export const getStaticPaths = (async () => {
  const paths = slugs.map((slug) => ({ params: { slug } }))
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}) satisfies GetStaticPaths

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Page: NextPage<PageProps> = ({ source }) => {
  return source ? <MDXRemote {...source} components={mdxComponents} /> : null
}

export default Page
