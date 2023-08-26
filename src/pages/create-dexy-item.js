import Head from 'next/head'
import { Button, Stack, Typography, styled } from '@mui/material'
import InputFileUpload from '@/components/UploadButton'
import { InputBaseStyledCreateItem } from '@/components/TextFieldWithLabel'
import CheckboxComponent from '@/components/CheckBox'
import { useSnackbar } from 'notistack'

const StackStyled = styled(Stack)(({ theme }) => ({
  paddingLeft: '10rem',
  paddingRight: '10rem',
  paddingBottom: '1.88rem',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '0rem',
    paddingRight: '0rem',
    paddingBottom: '3.06rem',
  },
}))

const HeadingH1Styled = styled(Typography)(({ theme }) => ({
  paddingTop: '2.56rem',
  [theme.breakpoints.down('md')]: {
    paddingBottom: '0',
    fontSize: '2rem',
  },
}))

const UploadTypography = styled(Typography)(({ theme }) => ({
  paddingTop: '0.94rem',
  paddingLeft: '2.18rem',
  [theme.breakpoints.down('md')]: {
    paddingTop: '1rem',
    paddingLeft: '0.94rem',
  },
}))

const HeadingH2Styled = styled(Typography)(({ theme }) => ({
  paddingTop: '1.44rem',
  [theme.breakpoints.down('md')]: {
    paddingTop: '1.24rem',
    paddingBottom: '0.62rem',
  },
}))

const UploadBox = styled(Stack)(({ theme }) => ({
  marginTop: '0.9rem',
  border: `1px solid ${theme.palette.grey[400]}`,
  borderStyle: 'dashed',
  [theme.breakpoints.down('md')]: {
    marginBottom: '0.62rem',
  },
}))

const CreateButton = styled(Button)(({ theme }) => ({
  width: '9.788rem',
  color: theme.palette.common.black,
  backgroundColor: theme.palette.common.white,
  marginTop: '1.25rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

const StackCheckBox = styled(Stack)(({ theme }) => ({
  paddingTop: '1.25rem',
  [theme.breakpoints.down('md')]: {
    paddingTop: '1.75rem',
  },
}))

const TypographyStyled = styled(Typography)(() => ({
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
}))

export default function CreateDexyItem() {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <>
      <Head>
        <title>DeXy | Homepage</title>
      </Head>
      <StackStyled direction="column">
        <HeadingH1Styled variant="h1" component="h1">
          Create Dexy Item
        </HeadingH1Styled>
        <HeadingH2Styled variant="h2" component="h2">
          Upload File
        </HeadingH2Styled>
        <TypographyStyled variant="body1" component="p">
          Add your image file
        </TypographyStyled>
        <UploadBox sx={{ direction: 'column' }}>
          <UploadTypography variant="body1" component="p">
            JPG, PNG, GIF, WEBP. Max 5mb.
          </UploadTypography>
          <InputFileUpload
            onChange={() => enqueueSnackbar('Failed to upload image', { variant: 'error' })}
          />
        </UploadBox>

        <HeadingH2Styled variant="h2" component="h2">
          Name
        </HeadingH2Styled>
        <TypographyStyled variant="body1" component="p">
          Choose a Dexy item unique name
        </TypographyStyled>
        <InputBaseStyledCreateItem placeholder="Enter the item’s name" />

        <HeadingH2Styled variant="h2" component="h2">
          Description
        </HeadingH2Styled>
        <TypographyStyled variant="body1" component="p">
          Describe your Dexy item for better understanding
        </TypographyStyled>
        <InputBaseStyledCreateItem placeholder="Enter the item’s description" />

        <HeadingH2Styled variant="h2" component="h2">
          Start Price
        </HeadingH2Styled>
        <TypographyStyled variant="body1" component="p">
          Fill in your initial cost of Dexy item
        </TypographyStyled>
        <InputBaseStyledCreateItem placeholder="Enter the item’s start price" />

        <HeadingH2Styled variant="h2" component="h2">
          Fix Price
        </HeadingH2Styled>
        <TypographyStyled variant="body1" component="p">
          Fill in your fixed cost to acquire Dexy item
        </TypographyStyled>
        <InputBaseStyledCreateItem placeholder="Enter the item’s fix price" />

        <StackCheckBox direction="row" spacing={{ lg: 1, md: 0 }} alignItems="center">
          <CheckboxComponent />
          <Typography variant="body1" component="p">
            I approve that I own and have rights of publication and sale of DeXy items
          </Typography>
        </StackCheckBox>
        <Stack direction="row" spacing={{ lg: 1, md: 0 }} alignItems="center">
          <CheckboxComponent />
          <Typography variant="body1" component="p">
            I agree to the terms and conditions
          </Typography>
        </Stack>
        <CreateButton>Create</CreateButton>
      </StackStyled>
    </>
  )
}
