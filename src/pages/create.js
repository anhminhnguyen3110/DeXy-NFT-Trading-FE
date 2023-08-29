/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen, Duy Khoa Pham
 * Created date: 25/08/2023
 * Last modified Date: 29/08/2023
 */
import Head from 'next/head'
import { Button, Container, Stack, Typography, styled } from '@mui/material'
import InputFileUpload from '@/components/UploadButton'
import InputBase from '@/components/InputBase'
import CheckboxComponent from '@/components/CheckBox'
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

const CreateButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  paddingInline: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'stretch',
  },
}))

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  paddingTop: theme.spacing(0.75),
}))

export default function CreateDexyItem() {
  const { enqueueSnackbar } = useSnackbar()

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
          <InputBaseStyled placeholder="Enter the item’s name" />
        </Stack>

        <Stack gap={0.8}>
          <Typography variant="h2" component="h2">
            Description
          </Typography>
          <Typography variant="body1">Describe your Dexy item for better understanding</Typography>
          <InputBaseStyled placeholder="Enter the item’s description" multiline />
        </Stack>

        <Stack gap={0.8}>
          <Typography variant="h2" component="h2">
            Start Price
          </Typography>
          <Typography variant="body1">Fill in your initial cost of Dexy item</Typography>
          <InputBaseStyled placeholder="Enter the item’s start price" type="number" />
        </Stack>

        <Stack gap={0.8}>
          <Typography variant="h2" component="h2">
            Fix Price
          </Typography>
          <Typography variant="body1">Fill in your fixed cost to acquire Dexy item</Typography>
          <InputBaseStyled placeholder="Enter the item’s fix price" type="number" />
        </Stack>

        <div>
          <Stack direction="row" gap={1} alignItems="center">
            <CheckboxComponent />
            <Typography variant="body1">
              I approve that I own and have rights of publication and sale of DeXy items
            </Typography>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <CheckboxComponent />
            <Typography variant="body1">I agree to the terms and conditions</Typography>
          </Stack>
        </div>

        <CreateButton variant="contained">Create</CreateButton>
      </RootStyled>
    </>
  )
}
