/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 29/08/2023
 * Last modified Date: 19/09/2023
 */
import { useState } from 'react'
import { Menu, MenuItem, Stack, Typography, styled } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchBar from '@/components/SearchBar'
import InputBase from '@/components/InputBase'
import PaginationButtons from '@/components/Pagination'

const InputBaseStyled = styled(InputBase)(() => ({
  maxWidth: '4rem',
}))

const ExpandMoreIconStyled = styled(ExpandMoreIcon)(() => ({
  alignSelf: 'center',
  transition: 'transform 0.3s',
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.2)',
  },
}))

const ListGridStyle = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(205px, 1fr))',
  columnGap: '2.5rem',
  rowGap: '2rem',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
    columnGap: '1rem',
    rowGap: '1rem',
  },
}))

const PaginationButtonsStyled = styled(PaginationButtons)(() => ({
  alignSelf: 'center',
}))

/**
 * Display a list of item cards with filter options and pagination
 * @param {JSX.Element} children item cards to display
 * @param {Array} categories list of categories
 * @param {Array} filterOptions list of filter options
 * @param {string} search search input
 * @param {number} startPrice start price input
 * @param {number} endPrice end price input
 * @param {string} sortBy sort by input
 * @param {number} category category input
 * @param {number} page page input
 * @param {number} totalPages total number of pages
 * @param {function} handleSearchChange handle search input change
 * @param {function} handleStartPriceChange handle start price input change
 * @param {function} handleEndPriceChange handle end price input change
 * @param {function} handleSortByChange handle sort by input change
 * @param {function} handleCategoryChange handle category input change
 * @param {function} handlePageChange handle page input change
 * @returns {JSX.Element}
 */
export default function ItemList({
  filterOptions,
  categories,
  search,
  startPrice,
  endPrice,
  sortBy,
  category,
  page,
  totalPages,
  handleSearchChange,
  handleStartPriceChange,
  handleEndPriceChange,
  handleSortByChange,
  handleCategoryChange,
  handlePageChange,
  children,
}) {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElCategory, setAnchorElCategory] = useState(null)

  const handleOpenSortby = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseSortbyOptions = () => {
    setAnchorElNav(null)
  }

  const hanldeSortbyOptionChoose = (option) => {
    handleSortByChange({ target: { value: option } })
    setAnchorElNav(null)
  }

  const handleOpenCategory = (event) => {
    setAnchorElCategory(event.currentTarget)
  }

  const handleCloseCategory = () => {
    setAnchorElCategory(null)
  }

  const handleCategoryChoose = (category) => {
    handleCategoryChange({ target: { value: category } })
    setAnchorElCategory(null)
  }

  return (
    <>
      <Stack
        gap={{ xs: 1, sm: 3 }}
        rowGap={1}
        flexWrap="wrap"
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        justifyContent="flex-start"
      >
        <SearchBar value={search} handleChange={handleSearchChange} />
        <Stack direction="row" gap={1.5} alignItems="center">
          <Typography variant="body1">Price range</Typography>
          <InputBaseStyled type="number" value={startPrice} onChange={handleStartPriceChange} />
          <InputBaseStyled type="number" value={endPrice} onChange={handleEndPriceChange} />
        </Stack>
        <Stack direction="row" gap={0.5} alignItems="center">
          <Typography variant="body1">{sortBy}</Typography>
          <ExpandMoreIconStyled fontSize="large" onClick={handleOpenSortby} />
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseSortbyOptions}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} onClick={() => hanldeSortbyOptionChoose(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Stack direction="row" gap={0.5} alignItems="center">
          <Typography variant="body1">{category}</Typography>
          <ExpandMoreIconStyled fontSize="large" onClick={handleOpenCategory} />
          <Menu
            anchorEl={anchorElCategory}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElCategory)}
            onClose={handleCloseCategory}
          >
            {categories?.map((category) => (
              <MenuItem key={`category-${category}`} onClick={() => handleCategoryChoose(category)}>
                {category}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>

      <ListGridStyle>{children}</ListGridStyle>

      <PaginationButtonsStyled
        page={page}
        handlePageChange={handlePageChange}
        pageCount={totalPages}
      />
    </>
  )
}
