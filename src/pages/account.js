import { useState } from 'react'
import Head from 'next/head'
import { Button } from '@mui/material'
import AccountEdit from '../layouts/account/AccountEdit'

export default function Account() {
  const [openEdit, setOpenEdit] = useState(false)

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  return (
    <>
      <Head>
        <title>DeXy | Account</title>
      </Head>
      <div>
        <Button onClick={() => setOpenEdit(true)} variant="contained">
          Edit
        </Button>
        <AccountEdit open={openEdit} handleClose={handleCloseEdit} handleSubmit={handleCloseEdit} />
      </div>
    </>
  )
}
