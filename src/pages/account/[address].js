/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 24/08/2023
 * Last modified Date: 29/09/2023
 */
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { formatEther } from 'viem'
import { useRouter } from 'next/router'
import { useAccount, useContractRead } from 'wagmi'
import copy from 'copy-to-clipboard'
import { useSnackbar } from 'notistack'
import { useItemListFilter, FILTER_OPTIONS } from '@/hooks/useItemListFilter'
import axios from '@/utils/axios'
import { Avatar, Button, Grid, Stack, Typography, Skeleton, styled, useTheme } from '@mui/material'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded'
import NonSSRWrapper from '@/utils/NonSsrWrapper'
import AccountEdit from '@/layouts/account/AccountEdit'
import ActionAreaCard from '@/components/Card'
import PaginationButtons from '@/components/Pagination'
import DynamicTable from '@/components/DynamicTable'
import ItemList from '@/layouts/marketplace/ItemList'
import { walletAddressFormat } from '@/utils/format'
import contractAbi from '@/utils/contractAbi'

const transactionDataColumns = [
  { id: 'event', label: 'Event', align: 'left' },
  { id: 'item', label: 'Item Id', align: 'left' },
  { id: 'price', label: 'Price', align: 'left' },
  { id: 'from', label: 'From', align: 'left' },
  { id: 'to', label: 'To', align: 'left' },
  { id: 'date', label: 'Date', align: 'left' },
]

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
  const theme = useTheme()
  const [openEdit, setOpenEdit] = useState(false)
  const [transactionData, setTransactionData] = useState([])
  const [transactionPage, setTransactionPage] = useState(1)
  const [transactionTotalPages, setTransactionTotalPages] = useState(2)
  const [transactionLoading, setTransactionLoading] = useState(true)
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
  } = useItemListFilter(Object.keys(categories))
  const {
    data: contractTransacitonData,
    isError: isContractError,
    isLoading: contractLoading,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: 'getTransactions',
    args: [
      transactionData.map((transaction) => parseInt(transaction.transaction_smart_contract_id)),
    ],
  })

  useEffect(() => {
    if (isContractError && !contractLoading) {
      enqueueSnackbar('Failed to get transaction history from the block chain', {
        variant: 'error',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContractError, enqueueSnackbar])

  useEffect(() => {
    const fetchItems = async () => {
      setItemLoading(true)
      try {
        const response = await axios.get('/items', {
          params: {
            ...(search && { search_input: search }),
            limit: 4,
            page: page,
            price_start: startPrice || 0,
            price_end: endPrice || 9999,
            sort_by: FILTER_OPTIONS[sortBy],
            ...(categories[category] !== '' && {
              category_id: categories[category],
            }),
            user_wallet_address: address,
          },
        })
        setItemList(response.data.data)
        setTotalPages(response.data.total_pages)
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to load items data', {
          variant: 'error',
        })
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
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to load user data', {
          variant: 'error',
        })
      }
    }
    if (address) fetchUser()
  }, [address, enqueueSnackbar, router])

  useEffect(() => {
    const fetchTransactionData = async () => {
      setTransactionLoading(true)
      try {
        const response = await axios.get(`/transactions/${address}?limit=5&page=${transactionPage}`)
        setTransactionData(response.data.data)
        setTransactionTotalPages(response.data.total_pages)
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to load transaction data', {
          variant: 'error',
        })
      } finally {
        setTransactionLoading(false)
      }
    }

    if (address) fetchTransactionData()
  }, [address, enqueueSnackbar, transactionPage])

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
      formData.append(
        'payload',
        JSON.stringify({
          user_name: username,
          user_email: email,
        })
      )
      if (typeof avatar !== 'string') formData.append('user_image', avatar)
      await axios({
        method: 'patch',
        url: `/users/edit`,
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
      enqueueSnackbar('Profile updated', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.detail ?? 'Error updating profile', {
        variant: 'error',
      })
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
                  src={`data:image/png;base64,${userInfo.user_image}`}
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
                    {userInfo.user_wallet_address
                      ? walletAddressFormat(userInfo.user_wallet_address)
                      : ''}
                  </Typography>
                  <Typography variant="body1">{userInfo.user_email}</Typography>
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
              <ItemList
                categories={Object.keys(categories)}
                filterOptions={Object.keys(FILTER_OPTIONS)}
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
                {itemLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={`account-item-skeleton-${index}`}
                      variant="rounded"
                      width={210}
                      height={300}
                    />
                  ))
                ) : itemList.length ? (
                  itemList.map((item) => (
                    <ActionAreaCard
                      userAddress={item.item_owner_address}
                      key={`account-item-${item.item_id}`}
                      image={item.item_image}
                      title={item.item_name}
                      price={item.item_fixed_price}
                      onClick={() => router.push(`/item/${item.item_id}`)}
                    />
                  ))
                ) : (
                  <Stack alignItems="center" gridColumn="1/-1">
                    <SearchOffRoundedIcon sx={{ fontSize: '5rem' }} />
                    <Typography variant="h4">No items found</Typography>
                  </Stack>
                )}
              </ItemList>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack gap={3.75}>
              <Typography variant="h2">Transaction History</Typography>
              <DynamicTable
                data={
                  transactionLoading || contractLoading
                    ? Array.from({ length: 5 }).map((_, idx) => ({
                        event: <Skeleton variant="text" width="2rem" />,
                        item: <Skeleton variant="text" width="2rem" />,
                        price: <Skeleton variant="text" width="2.5rem" />,
                        from: <Skeleton variant="text" width="7rem" />,
                        to: <Skeleton variant="text" width="7rem" />,
                        date: <Skeleton variant="text" width="11rem" />,
                      }))
                    : (contractTransacitonData ?? []).map((transaction) => ({
                        event: transaction.to === address ? 'Sell' : 'Buy',
                        item: (
                          <Link
                            href={`/item/${transaction.product}`}
                            style={{ color: theme.palette.primary.main }}
                          >
                            {transaction.product}
                          </Link>
                        ),
                        price: formatEther(transaction.price),
                        from: walletAddressFormat(transaction.from),
                        to: walletAddressFormat(transaction.to),
                        date: new Date(
                          parseInt(`${transaction.timestamp}`) * 1000
                        ).toLocaleString(),
                      }))
                }
                columns={transactionDataColumns}
              />
              <PaginationButtonsStyled
                page={transactionPage}
                handlePageChange={(_event, value) => {
                  setTransactionPage(value)
                }}
                pageCount={transactionTotalPages}
              />
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
  try {
    const response = await axios.get('/categories')
    const categories = response.data.data
    return {
      categories: Object.fromEntries([
        ['All', ''],
        ...categories.map((category) => [category.category_name, category.category_id]),
      ]),
    }
  } catch (error) {
    console.log(error)
    return { categories: {} }
  }
}
