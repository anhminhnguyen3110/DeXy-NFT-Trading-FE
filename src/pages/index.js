/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen, Duy Khoa Pham
 * Created date: 02/08/2023
 * Last modified Date: 29/08/2023
 */
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Grid, Stack, Typography, Button, styled } from '@mui/material'

const Container = styled(Grid)(({ theme }) => ({
  marginBlock: '1.5rem',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    marginBlock: '0rem 1.5rem',
  },
}))

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Teko, sans-serif',
  color: theme.palette.primary.main,
  fontSize: '4.5rem',
  fontWeight: 700,
  lineHeight: '4rem',
}))

const ButtonStyled = styled(Button)(() => ({
  flexGrow: 1,
  height: '3rem',
}))

const StyledImage = styled('img')(({ theme }) => ({
  width: '25.5rem',
  height: '42.5rem',
  [theme.breakpoints.down('lg')]: {
    width: '19.3125rem',
    height: '32.1875rem',
  },
}))

/**
 * Home page
 * @returns {JSX.Element}
 */
export default function Home() {
  const router = useRouter()

  const handleClickDiscover = () => {
    router.push(`/marketplace`)
  }

  const handleClickCreate = () => {
    router.push(`/create`)
  }

  return (
    <>
      <Head>
        <title>DeXy | Homepage</title>
      </Head>
      <Container container rowSpacing={6}>
        <Grid item xs={12} md={5} lg={3.75}>
          <Stack gap={3}>
            <LogoText>DeXy</LogoText>
            <Stack gap={{ xs: 1, md: 1.5 }}>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: '1.8rem', sm: '2.3rem', md: '2.75rem' } }}
              >
                Trading Platform
              </Typography>
              <Typography variant="h3">Create & trade Dexy Items</Typography>
            </Stack>
            <Stack
              direction="row"
              gap={2.5}
              sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
            >
              <ButtonStyled variant="contained" onClick={handleClickDiscover}>
                Discover
              </ButtonStyled>
              <ButtonStyled variant="outlined" onClick={handleClickCreate}>
                Create
              </ButtonStyled>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={7.5} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <StyledImage src="/background.png" alt="Description of the background" />
        </Grid>
      </Container>
    </>
  )
}
