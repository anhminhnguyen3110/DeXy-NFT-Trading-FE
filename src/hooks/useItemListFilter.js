/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 19/09/2023
 * Last modified Date: 19/09/2023
 */
import { useState } from 'react'

export const FILTER_OPTIONS = {
  Newest: 'NEWEST',
  Oldest: 'OLDEST',
  'Price (Lowest to highest)': 'PRICE_LOW_TO_HIGH',
  'Price (Highest to lowest)': 'PRICE_HIGH_TO_LOW',
}

export function useItemListFilter(categories) {
  const [search, setSearch] = useState('')
  const [startPrice, setStartPrice] = useState(0)
  const [endPrice, setEndPrice] = useState(100)
  const [sortBy, setSortBy] = useState(Object.keys(FILTER_OPTIONS)[0])
  const [category, setCategory] = useState(categories[0])
  const [page, setPage] = useState(1)

  function handleSearchChange(event) {
    setSearch(event.target.value)
    setPage(1)
  }

  function handleStartPriceChange(event) {
    setStartPrice(event.target.value)
    setPage(1)
  }

  function handleEndPriceChange(event) {
    setEndPrice(event.target.value)
    setPage(1)
  }

  function handleSortByChange(event) {
    setSortBy(event.target.value)
    setPage(1)
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value)
    setPage(1)
  }

  function handlePageChange(_event, value) {
    setPage(value)
  }

  return {
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
  }
}
