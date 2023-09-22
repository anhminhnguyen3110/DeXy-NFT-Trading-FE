/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen, Duy Khoa Pham
 * Created date: 25/08/2023
 * Last modified Date: 22/09/2023
 */
import { useState } from 'react'
import Head from 'next/head'
import axios from '@/utils/axios'
import { Container, Stack, Typography, Checkbox, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import InputFileUpload from '@/components/UploadButton'
import InputBase from '@/components/InputBase'
import { useSnackbar } from 'notistack'

const RootStyled = styled(Container)(() => ({
  paddingBlock: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}))

const UploadBox = styled(Stack)(({ theme }) => ({
  border: `1px dashed ${theme.palette.grey[400]}`,
  gap: '0.8rem',
  padding: '1rem',
  [theme.breakpoints.up('md')]: {
    paddingInline: '2.5rem',
  },
}))

const CreateButton = styled(LoadingButton)(({ theme }) => ({
  alignSelf: 'flex-start',
  paddingInline: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'stretch',
  },
}))

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  paddingTop: theme.spacing(0.75),
}))

/**
 * Create item page
 * @returns {JSX.Element}
 */
export default function CreateDexyItem() {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [acceptRight, setAcceptRight] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startPrice, setStartPrice] = useState(0)
  const [fixPrice, setFixPrice] = useState(0)

  const handleChangeRight = (event) => {
    setAcceptRight(event.target.checked)
  }

  const handleChangeTerms = (event) => {
    setAcceptTerms(event.target.checked)
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleChangeStartPrice = (event) => {
    setStartPrice(event.target.value)
  }

  const handleChangeFixPrice = (event) => {
    setFixPrice(event.target.value)
  }

  const handleCreate = async () => {
    if (!acceptRight || !acceptTerms) {
      enqueueSnackbar('You must accept the terms and conditions', { variant: 'error' })
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/items/create-item', {
        name,
        description,
        start_price: startPrice,
        fix_price: fixPrice,
      })
      enqueueSnackbar('Item created successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to create item', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>DeXy | Create</title>
      </Head>
      <RootStyled maxWidth="md">
        <Typography variant="h1" component="h1">
          Create Dexy Item
        </Typography>

        <Stack gap={0.8}>
          <Typography variant="h2" component="h2">
            Upload File
          </Typography>
          <Typography variant="body1">Add your image file</Typography>
          <UploadBox sx={{ direction: 'column' }}>
            <Typography variant="body1">JPG, PNG, GIF, WEBP. Max 5mb.</Typography>
            <InputFileUpload
              onChange={() => enqueueSnackbar('Failed to upload image', { variant: 'error' })}
            />
          </UploadBox>
        </Stack>

        <Stack gap={0.8}>
          <Typography variant="h2" component="h2">
            Name
          </Typography>
          <Typography variant="body1">Choose a Dexy item unique name</Typography>
          <InputBaseStyled
            placeholder="Enter the item’s name"
            value={name}
            onChange={handleChangeName}
          />
        </Stack>

        <Stack gap={0.8}>
          <Typography variant="h2" component="h2">
            Description
          </Typography>
          <Typography variant="body1">Describe your Dexy item for better understanding</Typography>
          <InputBaseStyled
            placeholder="Enter the item’s description"
            multiline
            value={description}
            onChange={handleChangeDescription}
          />
        </Stack>

        <Stack gap={0.8}>
          <Typography variant="h2" component="h2">
            Start Price
          </Typography>
          <Typography variant="body1">Fill in your initial cost of Dexy item</Typography>
          <InputBaseStyled
            placeholder="Enter the item’s start price"
            type="number"
            value={startPrice}
            onChange={handleChangeStartPrice}
          />
        </Stack>

        <Stack gap={0.8}>
          <Typography variant="h2" component="h2">
            Fix Price
          </Typography>
          <Typography variant="body1">Fill in your fixed cost to acquire Dexy item</Typography>
          <InputBaseStyled
            placeholder="Enter the item’s fix price"
            type="number"
            value={fixPrice}
            onChange={handleChangeFixPrice}
          />
        </Stack>

        <div>
          <Stack direction="row" gap={1} alignItems="center">
            <Checkbox disableRipple checked={acceptRight} onChange={handleChangeRight} />
            <Typography variant="body1">
              I approve that I own and have rights of publication and sale of DeXy items
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <Checkbox disableRipple checked={acceptTerms} onChange={handleChangeTerms} />
            <Typography variant="body1">I agree to the terms and conditions</Typography>
          </Stack>
        </div>

        <CreateButton variant="contained" onClick={handleCreate} loading={loading}>
          Create
        </CreateButton>
      </RootStyled>
    </>
  )
}
