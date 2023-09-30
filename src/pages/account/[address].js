/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 24/08/2023
 * Last modified Date: 29/09/2023
 */
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import copy from 'copy-to-clipboard'
import { useSnackbar } from 'notistack'
import { useItemListFilter, FILTER_OPTIONS } from '@/hooks/useItemListFilter'
import axios from '@/utils/axios'
import { Avatar, Button, Grid, Stack, Typography, Skeleton, styled } from '@mui/material'
import NonSSRWrapper from '@/utils/NonSsrWrapper'
import AccountEdit from '@/layouts/account/AccountEdit'
import userList from '@/dummy-data/user-list'
import dummyData from '@/dummy-data/item-list'
import ActionAreaCard from '@/components/Card'
import PaginationButtons from '@/components/Pagination'
import DynamicTable from '@/components/DynamicTable'
import transactionDummyData, { transactionDummyDataColumns } from '@/dummy-data/transaction'
import ItemList from '@/layouts/marketplace/ItemList'
import { walletAddressFormat } from '@/utils/format'

const EditButton = styled(Button)(({ theme }) => ({
  width: '9.25rem',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}))

const PaginationButtonsStyled = styled(PaginationButtons)(() => ({
  alignSelf: 'center',
}))

/**
 * Account detail page
 * @returns {JSX.Element}
 */
export default function Account({ categories }) {
  const [openEdit, setOpenEdit] = useState(false)
  const [transactionData, setTransactionData] = useState([])
  const router = useRouter()
  const { address } = router.query
  const [userInfo, setUserInfo] = useState({})
  const { address: userAddress } = useAccount()
  const { enqueueSnackbar } = useSnackbar()
  const [itemList, setItemList] = useState([])
  const [totalItemPages, setTotalPages] = useState(2)
  const [itemLoading, setItemLoading] = useState(false)
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
  } = useItemListFilter(categories)

  useEffect(() => {
    const fetchItems = async () => {
      setItemLoading(true)
      try {
        const response = await axios.get(
          `/items?search_input=${search}&limit=4&page=${
            page - 1
          }&price_start=${startPrice}&price_end=${endPrice}&sort_by=${sortBy}&category=${category}}&user_address=${address}`
        )
        setItemList(response.data.data)
        setTotalPages(Math.ceil(response.data.total_items / response.data.item_per_page))
      } catch {
        enqueueSnackbar('Failed to load items data', { variant: 'error' })
      } finally {
        setItemLoading(false)
      }
    }
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, category, endPrice, page, search, sortBy, startPrice])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${address}`)
        setUserInfo(response.data.data)
      } catch {
        router.push('/404')
        enqueueSnackbar('Failed to load user data', { variant: 'error' })
      }
    }
    if (address) fetchUser()
  }, [address, enqueueSnackbar, router])

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleCopyAdress = () => {
    copy(userInfo.user_address)
    enqueueSnackbar('Address copied to clipboard', { variant: 'success' })
  }

  const handleAccountEditSubmit = async (avatar, username, email) => {
    try {
      const formData = new FormData()
      formData.append('user_image', avatar)
      formData.append('user_name', username)
      formData.append('user_email', email)
      await axios({
        method: 'patch',
        url: `/users/edit/${userAddress}`,
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
      enqueueSnackbar('Profile updated', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error updating profile', { variant: 'error' })
    }
  }

  return (
    <>
      <Head>
        <title>DeXy | Account</title>
      </Head>
      <NonSSRWrapper>
        <Grid container rowSpacing={4} columnSpacing={3} marginTop={2.5} marginBottom={5}>
          <Grid item xs={12} lg={3}>
            {userInfo && (
              <Stack gap={2}>
                <Avatar
                  src={userInfo.user_image}
                  variant="circular"
                  sx={{ width: '7.5rem', height: '7.5rem' }}
                />
                <Stack gap={1}>
                  <Typography variant="h5">{userInfo.user_name}</Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    onClick={handleCopyAdress}
                    sx={{ cursor: 'pointer' }}
                  >
                    {userInfo.user_address ? walletAddressFormat(userInfo.user_address) : ''}
                  </Typography>
                  <Typography variant="body1">{userInfo.uswer_email}</Typography>
                </Stack>
                {address === userAddress && (
                  <EditButton variant="contained" onClick={() => setOpenEdit(true)}>
                    Edit
                  </EditButton>
                )}
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} lg={9}>
            <Stack direction="column" gap={2.5}>
              <Typography variant="h2">DeXy Items: </Typography>
              {itemList.length !== 0 && (
                <ItemList
                  categories={categories}
                  filterOptions={FILTER_OPTIONS}
                  search={search}
                  startPrice={startPrice}
                  endPrice={endPrice}
                  sortBy={sortBy}
                  category={category}
                  page={page}
                  totalPages={totalItemPages}
                  handleSearchChange={handleSearchChange}
                  handleStartPriceChange={handleStartPriceChange}
                  handleEndPriceChange={handleEndPriceChange}
                  handleSortByChange={handleSortByChange}
                  handleCategoryChange={handleCategoryChange}
                  handlePageChange={handlePageChange}
                >
                  {itemLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                          key={`account-item-skeleton-${index}`}
                          variant="rounded"
                          width={210}
                          height={300}
                        />
                      ))
                    : itemList.map((item) => (
                        <ActionAreaCard
                          userAddress={item.item_owner_address}
                          key={`account-item-${item.item_id}`}
                          image={item.item_image}
                          title={item.item_name}
                          price={item.item_fixed_price}
                          onClick={() => router.push(`/item/${item.item_id}`)}
                        />
                      ))}
                </ItemList>
              )}
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

        <AccountEdit
          userInfo={userInfo}
          open={openEdit}
          handleClose={handleCloseEdit}
          handleSubmit={handleAccountEditSubmit}
        />
      </NonSSRWrapper>
    </>
  )
}

Account.getInitialProps = async () => {
  const response = await axios.get('/category')
  const categories = response.data.data
  return { categories: categories.map((category) => category.category_name) }
}
