import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Avatar, Box, Button, Grid, Menu, MenuItem, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'
import {
  ExpandMoreIconStyled,
  FilterTextStyled,
  ListGridStyle,
  filterOptionsList,
} from '../marketplace'
import SearchBar from '@/components/SearchBar'
import { InputBaseStyledMarketplace } from '@/components/TextFieldWithLabel'
import dummyData from '@/dummy-data/item-list'
import userList from '@/dummy-data/user-list'
import ActionAreaCard from '@/components/Card'
import PaginationButtons from '@/components/Pagination'
import DynamicTable from '@/components/DynamicTable'
import transactionDummyData, { transactionDummyDataColumns } from '@/dummy-data/transaction'

const TypographyUsernameStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.3rem',
  paddingTop: '0.69rem',
}))

const TypographyUserAddressStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}))

const StackSearchFilterStyled = styled(Stack)(({ theme }) => ({
  justifySelf: 'flex-end',
}))

const DeXyTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    paddingTop: '2.5rem',
    paddingBottom: '1.25rem',
  },
}))

const PaginationGrid = styled(Grid)(({ theme }) => ({
  paddingBottom: '1.69rem',
  [theme.breakpoints.down('lg')]: {
    paddingBottom: '3.12rem',
  },
}))

const TransactionHistoryTypography = styled(Typography)(({ theme }) => ({
  paddingBottom: '1.94rem',
}))

export default function Account() {
  // get the address from the url
  const router = useRouter()
  const { address } = router.query
  const [userInfo, setUserInfo] = useState({})
  const [transactionData, setTransactionData] = useState([])
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    if (userInfo) {
      const data = dummyData.filter((item) => item.OwnedByUserAddress === userInfo.address)
      setTransactionData(transactionDummyData)
      setItemList(data)
    } else {
      router.push('/error')
    }
  }, [userInfo])

  useEffect(() => {
    if (address) {
      const user = userList.filter((item) => item.address == address)[0]
      setUserInfo(user)
    }
  }, [address])

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
        <title>DeXy | Account</title>
      </Head>
      <div>
        <Grid
          container
          columnGap={3}
          style={{
            paddingTop: '4.12rem',
          }}
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Stack direction="column" rowGap={1}>
              <Avatar
                src="/avatar.jpeg"
                variant="circular"
                sx={{ width: '7.5rem', height: '7.5rem' }}
              />
              <TypographyUsernameStyled variant="body1">{'userInfo.name'}</TypographyUsernameStyled>
              <TypographyUserAddressStyled variant="body1">{address}</TypographyUserAddressStyled>
              <Typography variant="body1">{'userInfo.email'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Stack direction="column" md={12} lg={9}>
              <DeXyTypography variant="h2">DeXy Items: </DeXyTypography>
              <StackSearchFilterStyled spacing={1} direction={{ md: 'column', lg: 'row' }}>
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
              </StackSearchFilterStyled>
              <ListGridStyle
                style={{
                  paddingTop: '1.54rem',
                  paddingBottom: '1rem',
                }}
                item
                container
                columnGap={3.56}
              >
                {itemList.map((item, id) => (
                  <ActionAreaCard
                    key={id}
                    image={item.image}
                    title={item.title}
                    price={item.FixPrice}
                  />
                ))}
              </ListGridStyle>
              <PaginationGrid item container justifyContent="center">
                <PaginationButtons />
              </PaginationGrid>
            </Stack>
          </Grid>
        </Grid>

        <TransactionHistoryTypography variant="h2">
          Transaction History
        </TransactionHistoryTypography>
        {transactionData.length > 0 && (
          <>
            <DynamicTable data={transactionData} columns={transactionDummyDataColumns} />
            <Grid
              style={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
              }}
              item
              container
              justifyContent="center"
            >
              <PaginationButtons />
            </Grid>
          </>
        )}
      </div>
    </>
  )
}
