/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen, Duy Khoa Pham
 * Created date: 25/08/2023
 * Last modified Date: 29/09/2023
 */
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import Head from 'next/head'
import axios from '@/utils/axios'
import { Container, Stack, Typography, Checkbox, Select, MenuItem, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import InputFileUpload from '@/components/UploadButton'
import InputBase from '@/components/InputBase'
import NonSsrWrapper from '@/utils/NonSsrWrapper'

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
 *
 * @param {object} categories
 * @returns {JSX.Element}
 */
export default function CreateItem({ categories }) {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [acceptRight, setAcceptRight] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [fixPrice, setFixPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState(0)
  const router = useRouter()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

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
      const formData = new FormData()
      formData.append(
        'payload',
        JSON.stringify({
          name,
          description,
          fix_price: fixPrice,
          category_id: categories[category].id,
          create_date: new Date().toISOString(),
        })
      )
      formData.append('item_file', file)
      const response = await axios({
        method: 'POST',
        url: '/items/create-item',
        data: formData,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
      router.push(`/item/${response.data.id}`)
      enqueueSnackbar('Item created successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to create item', {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = (event) => {
    setFile(event.target.files[0])
  }

  if (!isConnected) {
    return null
  }

  return (
    <>
      <Head>
        <title>DeXy | Create</title>
      </Head>
      <NonSsrWrapper>
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
              <Typography variant="body1">
                {file ? file.name : 'JPG, PNG, GIF, WEBP. Max 5mb.'}
              </Typography>
              <InputFileUpload onChange={handleUpload} />
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
              Category
            </Typography>
            <Typography variant="body1">Choose a Dexy item category</Typography>
            <Select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              input={<InputBaseStyled />}
            >
              {categories.map((item, idx) => (
                <MenuItem key={`category-${item.id}`} value={idx}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack gap={0.8}>
            <Typography variant="h2" component="h2">
              Description
            </Typography>
            <Typography variant="body1">
              Describe your Dexy item for better understanding
            </Typography>
            <InputBaseStyled
              placeholder="Enter the item’s description"
              multiline
              value={description}
              onChange={handleChangeDescription}
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
              <Checkbox
                disableRipple
                checked={acceptRight}
                onChange={handleChangeRight}
                sx={{ paddingLeft: '0' }}
              />
              <Typography variant="body1">
                I approve that I own and have rights of publication and sale of DeXy items
              </Typography>
            </Stack>
            <Stack direction="row" gap={1} alignItems="center">
              <Checkbox
                disableRipple
                checked={acceptTerms}
                onChange={handleChangeTerms}
                sx={{ paddingLeft: '0' }}
              />
              <Typography variant="body1">I agree to the terms and conditions</Typography>
            </Stack>
          </div>

          <CreateButton variant="contained" onClick={handleCreate} loading={loading}>
            Create
          </CreateButton>
        </RootStyled>
      </NonSsrWrapper>
    </>
  )
}

CreateItem.getInitialProps = async () => {
  const response = await axios.get('/categories')
  const categories = response.data.data
  return {
    categories: categories.map((category) => ({
      id: category.category_id,
      name: category.category_name,
    })),
  }
}
