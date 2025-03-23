import type { FC } from "react"
import type { AppProps } from "next/app"
import { Noto_Sans_JP } from "next/font/google"
import "@/styles/globals.css"
import { TopLayout } from "@/layouts/top-layout"
import Head from "next/head"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap"
})
const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <TopLayout>
        <Component {...{ ...pageProps, notoSansJP }} />
      </TopLayout>
    </>
  )
}

export default App
