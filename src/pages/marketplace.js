import Head from 'next/head'
import { Box, Grid, Menu, MenuItem, Paper, Typography } from '@mui/material'
import styled from '@emotion/styled'
import SearchBar from '@/components/SearchBar'
import { InputBaseStyledMarketplace } from '@/components/TextFieldWithLabel'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState, useEffect } from 'react'
import ActionAreaCard from '@/components/Card'
import dummyData from '@/dummy-data/item-list'
import PaginationButtons from '@/components/Pagination'

const MarketPlaceStyled = styled(Typography)(({ theme }) => ({
  paddingBlock: '2rem',
  [theme.breakpoints.down('sm')]: {
    paddingBlock: '1rem',
  },
}))

export const ExpandMoreIconStyled = styled(ExpandMoreIcon)(({ theme }) => ({
  paddingTop: theme.spacing(1),
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

const ListGridStyle = styled(Grid)(({ theme }) => ({
  paddingTop: '40px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(205px, 1fr))',
  columnGap: '2.5rem',
  rowGap: '2rem',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, minmax(10.4375rem, 1fr))',
    columnGap: '1rem',
    rowGap: '1rem',
  },
}))

export default function MarketPlace() {
  const [itemList, setItemList] = useState([])

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
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} lg={3}>
            <SearchBar isTopMenuSearch={false} />
          </Grid>
          <Grid item xs={12} sm={12} lg={2}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <FilterTextStyled variant="body1">Price range</FilterTextStyled>
              <InputBaseStyledMarketplace />
              <InputBaseStyledMarketplace />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <FilterTextStyled variant="body1">{filterOption}</FilterTextStyled>
              <ExpandMoreIconStyled fontSize="large" onClick={handleFilterOptions} />
            </Box>
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
          </Grid>
        </Grid>

        <ListGridStyle container columnGap={6} rowGap={4}>
          {itemList.map((item, id) => (
            <ActionAreaCard key={id} image={item.image} title={item.title} price={item.FixPrice} />
          ))}
        </ListGridStyle>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: '40px',
            paddingBottom: '40px',
          }}
        >
          <PaginationButtons />
        </Box>
      </div>
    </>
  )
}
