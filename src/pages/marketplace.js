/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 24/08/2023
 * Last modified Date: 19/09/2023
 */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useItemListFilter, FILTER_OPTIONS } from '@/hooks/useItemListFilter'
import Head from 'next/head'
import axios from '@/utils/axios'
import { Stack, Typography, Skeleton } from '@mui/material'
import ActionAreaCard from '@/components/Card'
import ItemList from '@/layouts/marketplace/ItemList'

/**
 * Marketplace page
 * @param {Array} categories list of categories
 * @returns {JSX.Element}
 */
// Define component states and hooks
export default function Marketplace({ categories }) {
  const [itemList, setItemList] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [itemLoading, setItemLoading] = useState(false)
  const enqueueSnackbar = useSnackbar()
  const router = useRouter()
  const {
    search,
    startPrice,
    endPrice,
    sortBy,
    category,
    page,
    handleSearchChange,
    handleStartPriceChange,
    handleEndPriceChange,
    handleSortByChange,
    handleCategoryChange,
    handlePageChange,
  } = useItemListFilter(categories)

  // get item list
  useEffect(() => {
    const fetchItems = async () => {
      setItemLoading(true)
      try {
        const response = await axios.get(
          `/items?&search_input=${search}&limit=12&page=${
            page - 1
          }&price_start=${startPrice}&price_end=${endPrice}&sort_by=${sortBy}&category=${category}}`
        )
        setItemList(response.data.data)
        setTotalPages(Math.ceil(response.data.total_items / response.data.item_per_page))
      } catch {
        enqueueSnackbar('Failed to load items data', { variant: 'error' })
      } finally {
        setItemLoading(false)
      }
    }
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, endPrice, page, search, sortBy, startPrice])

  return (
    <>
      <Head>
        <title>DeXy | Marketplace</title>
      </Head>
      <Stack paddingY={4} gap={{ xs: 2.5, md: 4 }}>
        <Typography variant="h2">Marketplace</Typography>

        <ItemList
          categories={categories}
          filterOptions={FILTER_OPTIONS}
          search={search}
          startPrice={startPrice}
          endPrice={endPrice}
          sortBy={sortBy}
          category={category}
          page={page}
          totalPages={totalPages}
          handleSearchChange={handleSearchChange}
          handleStartPriceChange={handleStartPriceChange}
          handleEndPriceChange={handleEndPriceChange}
          handleSortByChange={handleSortByChange}
          handleCategoryChange={handleCategoryChange}
          handlePageChange={handlePageChange}
        >
          {itemLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <Skeleton
                  key={`marketplace-item-skeleton-${index}`}
                  variant="rounded"
                  width={210}
                  height={300}
                />
              ))
            : itemList.map((item) => (
                <ActionAreaCard
                  userAddress={item.item_owner_address}
                  key={`marketplace-item-${item.item_id}`}
                  image={item.item_image}
                  title={item.item_name}
                  price={item.item_fixed_price}
                  onClick={() => router.push(`/item/${item.item_id}`)}
                />
              ))}
        </ItemList>
      </Stack>
    </>
  )
}

Marketplace.getInitialProps = async () => {
  const response = await axios.get('/category')
  const categories = response.data.data
  return { categories: categories.map((category) => category.category_name) }
}
