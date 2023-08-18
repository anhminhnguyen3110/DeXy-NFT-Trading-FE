import ActionAreaCard from '@/components/Card'
import Head from 'next/head'

export default function Test() {
  return (
    <>
      <Head>
        <title>DeXy | Homepage</title>
      </Head>
      <main>
        <ActionAreaCard
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Lizard"
          price="0.009"
        />
      </main>
    </>
  )
}
