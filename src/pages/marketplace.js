import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Grid, Menu, MenuItem, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'
import SearchBar from '@/components/SearchBar'
import { InputBaseStyledMarketplace } from '@/components/TextFieldWithLabel'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState, useEffect } from 'react'
import dummyData from '@/dummy-data/item-list'
import PaginationButtons from '@/components/Pagination'
import { ActionAreaCardWithUserAddress } from '@/components/Card'

const MarketPlaceStyled = styled(Typography)(({ theme }) => ({
  paddingTop: '2.31rem',
  paddingBottom: '2.06rem',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '1.06rem',
    paddingBottom: '1.38rem',
  },
}))

export const ExpandMoreIconStyled = styled(ExpandMoreIcon)(({ theme }) => ({
  alignSelf: 'center',
  transition: 'transform 0.3s',
  ':hover': {
    cursor: 'pointer',
    transform: 'scale(1.4)',
  },
}))

export const FilterTextStyled = styled(Typography)(({ theme }) => ({
  paddingBlock: '0.65rem',
  fontSize: '1rem',
  [theme.breakpoints.down('md')]: {
    paddingBlock: '1rem',
  },
}))

export const filterOptionsList = [
  'Recently listed',
  'Price (Lowest to highest)',
  'Price (Highest to lowest)',
  'Newest',
  'Oldest',
]

const PaginationBoxStyled = styled(Box)(({ theme }) => ({
  paddingTop: '1.56rem',
  paddingBottom: '3.44rem',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '1.94rem',
    paddingBottom: '5.54rem',
  },
}))

export const ListGridStyle = styled(Grid)(({ theme }) => ({
  paddingTop: '2.15rem',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(205px, 1fr))',
  columnGap: '2.5rem',
  rowGap: '2rem',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, minmax(10.4375rem, 1fr))',
    columnGap: '1rem',
    rowGap: '1rem',
    paddingTop: '0.86rem',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, minmax(10.4375rem, 1fr))',
    columnGap: '1rem',
    rowGap: '1rem',
    paddingTop: '0.86rem',
  },
}))

export default function MarketPlace() {
  const [itemList, setItemList] = useState([])
  const router = useRouter()

  useEffect(() => {
    setItemList(dummyData)
  }, [])

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [filterOption, setFilterOption] = useState(filterOptionsList[0]) // default: 'Recently listed'
  const handleFilterOptions = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseFilterOptions = () => {
    setAnchorElNav(null)
  }

  const hanldeFilterOptionChoose = (option) => {
    setFilterOption(option)
    setAnchorElNav(null)
  }

  return (
    <>
      <Head>
        <title>DeXy | Homepage</title>
      </Head>
      <div>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <MarketPlaceStyled variant="h2">Marketplace</MarketPlaceStyled>
        </Box>
        <Stack
          columnGap={3}
          direction={{ md: 'column', lg: 'row' }}
          alignItems={{ lg: 'center' }}
          justifyContent="flex-start"
        >
          <SearchBar isTopMenuSearch={false} />
          <Box sx={{ display: 'flex', flexDirection: 'row', spacing: 1 }}>
            <FilterTextStyled variant="body1">Price range</FilterTextStyled>
            <InputBaseStyledMarketplace />
            <InputBaseStyledMarketplace />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FilterTextStyled variant="body1">{filterOption}</FilterTextStyled>
            <ExpandMoreIconStyled fontSize="large" onClick={handleFilterOptions} />
            <Menu
              id="menu-appbar"
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
              onClose={handleCloseFilterOptions}
            >
              {filterOptionsList.map((option) => (
                <MenuItem key={option} onClick={() => hanldeFilterOptionChoose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>

        <ListGridStyle container columnGap={6} rowGap={4}>
          {itemList.map((item, id) => (
            <ActionAreaCardWithUserAddress
              userAddress={item.OwnedByUserAddress}
              key={id}
              image={item.image}
              title={item.title}
              price={item.FixPrice}
              onClick={() => router.push(`/item/${item.id}`)}
            />
          ))}
        </ListGridStyle>

        <PaginationBoxStyled
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <PaginationButtons />
        </PaginationBoxStyled>
      </div>
    </>
  )
}
