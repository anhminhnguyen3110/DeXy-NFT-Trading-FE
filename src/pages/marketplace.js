/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 24/08/2023
 * Last modified Date: 29/08/2023
 */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Stack, Typography } from '@mui/material'
import ActionAreaCard from '@/components/Card'
import dummyData from '@/dummy-data/item-list'
import ItemList from '@/layouts/marketplace/ItemList'

/**
 * Marketplace page
 * @returns {JSX.Element}
 */
export default function Marketplace() {
  const [itemList, setItemList] = useState([])
  const router = useRouter()

  // get item list
  useEffect(() => {
    setItemList(dummyData)
  }, [])

  return (
    <>
      <Head>
        <title>DeXy | Marketplace</title>
      </Head>
      <Stack paddingY={4} gap={{ xs: 2.5, md: 4 }}>
        <Typography variant="h2">Marketplace</Typography>

        <ItemList>
          {itemList.map((item) => (
            <ActionAreaCard
              userAddress={item.OwnedByUserAddress}
              key={`marketplace-item-${item.id}`}
              image={item.image}
              title={item.title}
              price={item.FixPrice}
              onClick={() => router.push(`/item/${item.id}`)}
            />
          ))}
        </ItemList>
      </Stack>
    </>
  )
}
