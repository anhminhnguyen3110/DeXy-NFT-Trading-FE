import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Avatar, Button, Grid, Menu, MenuItem, Stack, Typography, styled } from '@mui/material'
import AccountEdit from '../../layouts/account/AccountEdit'
import {
  InputBaseStyled,
  ExpandMoreIconStyled,
  ListGridStyle,
  filterOptionsList,
} from '../marketplace'
import SearchBar from '@/components/SearchBar'
import userList from '@/dummy-data/user-list'
import dummyData from '@/dummy-data/item-list'
import ActionAreaCard from '@/components/Card'
import PaginationButtons from '@/components/Pagination'
import DynamicTable from '@/components/DynamicTable'
import transactionDummyData, { transactionDummyDataColumns } from '@/dummy-data/transaction'

const EditButton = styled(Button)(({ theme }) => ({
  width: '9.25rem',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))

const PaginationButtonsStyled = styled(PaginationButtons)(() => ({
  alignSelf: 'center',
}))

export default function Account() {
  const [openEdit, setOpenEdit] = useState(false)
  const [transactionData, setTransactionData] = useState([])
  const [itemList, setItemList] = useState([])
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [filterOption, setFilterOption] = useState(filterOptionsList[0]) // default: 'Recently listed'
  const router = useRouter()
  const { address } = router.query
  const [userInfo, setUserInfo] = useState({})
  const editable = address == userList[0].address

  useEffect(() => {
    if (userInfo) {
      const data = dummyData.filter((item) => item.OwnedByUserAddress === userInfo.address)
      setTransactionData(transactionDummyData)
      setItemList(data)
    } else {
      router.push('/error')
    }
  }, [router, userInfo])

  useEffect(() => {
    if (address) {
      const user = userList.filter((item) => item.address == address)[0]
      setUserInfo(user)
    }
  }, [address])

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

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
      <Grid container rowSpacing={4} columnSpacing={3} marginTop={2.5} marginBottom={5}>
        <Grid item xs={12} lg={3}>
          <Stack gap={2}>
            <Avatar
              src="/avatar.jpeg"
              variant="circular"
              sx={{ width: '7.5rem', height: '7.5rem' }}
            />
            <Stack gap={1}>
              <Typography variant="h5">{userInfo.name}</Typography>
              <Typography variant="subtitle1" fontWeight="600">
                {userInfo.address}
              </Typography>
              <Typography variant="body1">{userInfo.email}</Typography>
            </Stack>
            {editable && (
              <EditButton variant="contained" onClick={() => setOpenEdit(true)}>
                Edit
              </EditButton>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Stack direction="column" gap={2.5}>
            <Typography variant="h2">DeXy Items: </Typography>
            <Stack
              gap={{ xs: 1, sm: 3 }}
              rowGap={1}
              flexWrap="wrap"
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ sm: 'center' }}
              justifyContent="flex-start"
            >
              <SearchBar />
              <Stack direction="row" gap={1.5} alignItems="center">
                <Typography variant="body1">Price range</Typography>
                <InputBaseStyled type="number" />
                <InputBaseStyled type="number" />
              </Stack>
              <Stack direction="row" gap={0.5} alignItems="center">
                <Typography variant="body1">{filterOption}</Typography>
                <ExpandMoreIconStyled fontSize="large" onClick={handleFilterOptions} />
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
                  onClose={handleCloseFilterOptions}
                >
                  {filterOptionsList.map((option) => (
                    <MenuItem key={option} onClick={() => hanldeFilterOptionChoose(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            </Stack>
            <ListGridStyle>
              {itemList.map((item) => (
                <ActionAreaCard
                  key={`account-item-${item.id}`}
                  image={item.image}
                  title={item.title}
                  price={item.FixPrice}
                  onClick={() => router.push(`/item/${item.id}`)}
                />
              ))}
            </ListGridStyle>
            <PaginationButtonsStyled />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack gap={3.75}>
            <Typography variant="h2">Transaction History</Typography>
            {transactionData.length > 0 && (
              <>
                <DynamicTable data={transactionData} columns={transactionDummyDataColumns} />
                <PaginationButtonsStyled />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>

      <AccountEdit open={openEdit} handleClose={handleCloseEdit} handleSubmit={handleCloseEdit} />
    </>
  )
}
