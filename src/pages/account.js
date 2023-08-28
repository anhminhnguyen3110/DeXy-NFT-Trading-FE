import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Avatar, Box, Button, Grid, Menu, MenuItem, Stack, Typography } from '@mui/material'
import AccountEdit from '../layouts/account/AccountEdit'
import styled from '@emotion/styled'
import {
  ExpandMoreIconStyled,
  FilterTextStyled,
  ListGridStyle,
  filterOptionsList,
} from './marketplace'
import SearchBar from '@/components/SearchBar'
import { InputBaseStyledMarketplace } from '@/components/TextFieldWithLabel'
import dummyData from '@/dummy-data/item-list'
import ActionAreaCard from '@/components/Card'
import PaginationButtons from '@/components/Pagination'
import DynamicTable from '@/components/DynamicTable'
import transactionDummyData, { transactionDummyDataColumns } from '@/dummy-data/transaction'

const userDetail = {
  name: 'John Doe',
  address: '0x8f3...70da',
  email: 'JohnDoe@gmail.com',
}

const TypographyUsernameStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.3rem',
  paddingTop: '0.69rem',
}))

const TypographyUserAddressStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}))

const EditButton = styled(Button)(({ theme }) => ({
  width: '9.25rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const StackSearchFilterStyled = styled(Stack)(({ theme }) => ({
  justifySelf: 'flex-end',
}))

const EditButtonStyled = styled(EditButton)(({ theme }) => ({
  marginTop: '1.rem',
  [theme.breakpoints.down('lg')]: {
    marginBottom: '3.13rem',
    width: '100%',
  },
}))

const DeXyTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
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
  const [openEdit, setOpenEdit] = useState(false)
  const [transactionData, setTransactionData] = useState([])
  const router = useRouter()

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    const data = dummyData.filter((item) => item.OwnedBy === userDetail.name)
    setTransactionData(transactionDummyData)
    setItemList(data)
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
              <TypographyUsernameStyled variant="body1">{userDetail.name}</TypographyUsernameStyled>
              <TypographyUserAddressStyled variant="body1">
                {userDetail.address}
              </TypographyUserAddressStyled>
              <Typography variant="body1">{userDetail.email}</Typography>
              <EditButtonStyled variant="contained" onClick={() => setOpenEdit(true)}>
                Edit
              </EditButtonStyled>
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
                    onClick={() => router.push(`/item/${item.id}`)}
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
        <AccountEdit open={openEdit} handleClose={handleCloseEdit} handleSubmit={handleCloseEdit} />
      </div>
    </>
  )
}
