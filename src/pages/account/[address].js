/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 24/08/2023
 * Last modified Date: 29/08/2023
 */
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Avatar, Button, Grid, Stack, Typography, styled } from '@mui/material'
import AccountEdit from '../../layouts/account/AccountEdit'
import userList from '@/dummy-data/user-list'
import dummyData from '@/dummy-data/item-list'
import ActionAreaCard from '@/components/Card'
import PaginationButtons from '@/components/Pagination'
import DynamicTable from '@/components/DynamicTable'
import transactionDummyData, { transactionDummyDataColumns } from '@/dummy-data/transaction'
import ItemList from '@/layouts/marketplace/ItemList'

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
export default function Account() {
  const [openEdit, setOpenEdit] = useState(false)
  const [transactionData, setTransactionData] = useState([])
  const [itemList, setItemList] = useState([])
  const router = useRouter()
  const { address } = router.query
  const [userInfo, setUserInfo] = useState({})
  const editable = address == userList[0].address

  // get item list and transaction history of user
  useEffect(() => {
    if (userInfo) {
      const data = dummyData.filter((item) => item.OwnedByUserAddress === userInfo.address)
      setTransactionData(transactionDummyData)
      setItemList(data)
    }
  }, [userInfo])

  // get user info from address
  useEffect(() => {
    if (address) {
      const user = userList.filter((item) => item.address == address)[0]
      console.log(user)
      if (!user) {
        router.push('/404')
        return
      }
      setUserInfo(user)
    }
  }, [address, router])

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  return (
    <>
      <Head>
        <title>DeXy | Account</title>
      </Head>
      <Grid container rowSpacing={4} columnSpacing={3} marginTop={2.5} marginBottom={5}>
        <Grid item xs={12} lg={3}>
          {userInfo && (
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
          )}
        </Grid>

        <Grid item xs={12} lg={9}>
          <Stack direction="column" gap={2.5}>
            <Typography variant="h2">DeXy Items: </Typography>
            {itemList.length !== 0 && (
              <ItemList>
                {itemList.map((item) => (
                  <ActionAreaCard
                    key={`account-item-${item.id}`}
                    image={item.image}
                    title={item.title}
                    price={item.FixPrice}
                    onClick={() => router.push(`/item/${item.id}`)}
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

      <AccountEdit open={openEdit} handleClose={handleCloseEdit} handleSubmit={handleCloseEdit} />
    </>
  )
}
