/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 19/09/2023
 * Last modified Date: 19/09/2023
 */
import { useState } from 'react'

export const FILTER_OPTIONS = [
  'Recently listed',
  'Price (Lowest to highest)',
  'Price (Highest to lowest)',
  'Newest',
  'Oldest',
]

export function useItemListFilter(categories) {
  const [search, setSearch] = useState('')
  const [startPrice, setStartPrice] = useState(0)
  const [endPrice, setEndPrice] = useState(100)
  const [sortBy, setSortBy] = useState(FILTER_OPTIONS[0])
  const [category, setCategory] = useState(categories[0])
  const [page, setPage] = useState(1)

  function handleSearchChange(event) {
    setSearch(event.target.value)
  }

  function handleStartPriceChange(event) {
    setStartPrice(event.target.value)
  }

  function handleEndPriceChange(event) {
    setEndPrice(event.target.value)
  }

  function handleSortByChange(event) {
    setSortBy(event.target.value)
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value)
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
