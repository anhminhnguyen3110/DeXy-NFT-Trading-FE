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
import axios1 from 'axios'
import { Stack, Typography, Skeleton } from '@mui/material'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded'
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
  const { enqueueSnackbar } = useSnackbar()
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
  } = useItemListFilter(Object.keys(categories))

  // get item list
  useEffect(() => {
    const fetchItems = async () => {
      setItemLoading(true)
      try {
        const response = await axios.get('/items', {
          params: {
            ...(search && { search_input: search }),
            limit: 4,
            page: page,
            price_start: startPrice || 0,
            price_end: endPrice || 9999,
            sort_by: FILTER_OPTIONS[sortBy],
            category_id: categories[category],
          },
        })
        setItemList(response.data.data)
        setTotalPages(response.data.total_pages)
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to load items data', {
          variant: 'error',
        })
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
          categories={Object.keys(categories)}
          filterOptions={Object.keys(FILTER_OPTIONS)}
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
          {itemLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                key={`marketplace-item-skeleton-${index}`}
                variant="rounded"
                width={210}
                height={300}
              />
            ))
          ) : itemList.length ? (
            itemList.map((item) => (
              <ActionAreaCard
                userAddress={item.item_owner_address}
                key={`marketplace-item-${item.item_id}`}
                image={item.item_image}
                title={item.item_name}
                price={item.item_fixed_price}
                onClick={() => router.push(`/item/${item.item_id}`)}
              />
            ))
          ) : (
            <Stack alignItems="center" gridColumn="1/-1">
              <SearchOffRoundedIcon sx={{ fontSize: '5rem' }} />
              <Typography variant="h4">No items found</Typography>
            </Stack>
          )}
        </ItemList>
      </Stack>
    </>
  )
}

Marketplace.getInitialProps = async () => {
  const response = await axios.get('/categories')
  const categories = response.data.data
  return {
    categories: Object.fromEntries(
      categories.map((category) => [category.category_name, category.category_id])
    ),
  }
}
