import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

export default function Home() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState()

  const executeQuery = async (query) => {
    try {
      const response = await axios.post('/api/query', { query })
      let data = await response.data
      setData(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Head>
        <title>DeXy | Homepage</title>
      </Head>
      <div>
        <textarea type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={() => executeQuery(query)}>Execute</button>
        <div>{data}</div>
      </div>
    </>
  )
}
