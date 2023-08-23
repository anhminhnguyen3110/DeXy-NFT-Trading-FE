import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material'
import AccountEdit from '../layouts/account/AccountEdit'
import styled from '@emotion/styled'
import { ExpandMoreIconStyled, FilterTextStyled, filterOptionsList } from './marketplace'
import SearchBar from '@/components/SearchBar'
import { InputBaseStyledMarketplace } from '@/components/TextFieldWithLabel'
import dummyData from '@/dummy-data/item-list'
import ActionAreaCard from '@/components/Card'
import PaginationButtons from '@/components/Pagination'
import DynamicTable from '@/components/DynamicTable'
import transactionDummyData from '@/dummy-data/transaction'

const userDetail = {
  name: 'John Doe',
  address: '0x8f3...70da',
  email: 'JohnDoe@gmail.com',
}

const TypographyUsernameStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.3rem',
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

const ListGridStyle = styled(Grid)(({ theme }) => ({
  paddingTop: '40px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(205px, 1fr))',
  columnGap: '2.5rem',
  rowGap: '2rem',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(10.4375rem, 1fr))',
    columnGap: '1rem',
    rowGap: '1rem',
  },
}))

export default function Account() {
  const [openEdit, setOpenEdit] = useState(false)
  const [transactionData, setTransactionData] = useState([])
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
          style={{
            paddingTop: '2rem',
          }}
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Grid container item direction="column" rowGap={1} md={12} lg={3}>
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
            <EditButton variant="contained" onClick={() => setOpenEdit(true)}>
              Edit
            </EditButton>
          </Grid>

          <Grid container item direction="column" rowGap={1} md={12} lg={9}>
            <Typography variant="h2">DeXy Items Owned: </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} lg={3}>
                <SearchBar isTopMenuSearch={false} />
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
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

            <ListGridStyle
              style={{
                paddingTop: '1rem',
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

            <Grid item container justifyContent="center">
              <PaginationButtons />
            </Grid>
          </Grid>
        </Grid>

        <Typography variant="h2">Dynamic Table</Typography>
        {transactionData.length > 0 && (
          <>
            <DynamicTable data={transactionData} />
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
