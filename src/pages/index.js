import Head from 'next/head'
import { useRouter } from 'next/router'
import { Grid, Stack, Typography, Button, styled } from '@mui/material'

const Container = styled(Grid)(({ theme }) => ({
  paddingTop: '5.06rem',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    paddingTop: '1.25rem',
  },
}))

const ClickingButton = styled(Button)(({ theme }) => ({
  width: '11.375rem',
  height: '3.625rem',
}))

const StyledImage = styled('img')(({ theme }) => ({
  width: '25.5rem',
  height: '42.5rem',
  [theme.breakpoints.down('lg')]: {
    paddingTop: '3.13rem',
    paddingBottom: '3.12rem',
    width: '19.3125rem',
    height: '32.1875rem',
  },
}))

const h1Style = {
  fontSize: { xs: '38px', md: 'h1.fontSize' },
}

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
      <Container container>
        <Grid item xs={12} md={6} lg={4}>
          <Stack rowGap={2.5} mb={7}>
            <Typography variant="h1" sx={h1Style} color={'primary'}>
              Dexy Items
            </Typography>
            <Typography variant="h1" sx={h1Style}>
              Trading Platform
            </Typography>
            <Typography variant="h3">Create & trade Dexy Items</Typography>
          </Stack>
          <Stack
            direction="row"
            columnGap={3.38}
            sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
          >
            <ClickingButton variant="contained" onClick={handleClickDiscover}>
              Discover
            </ClickingButton>
            <ClickingButton variant="outlined" onClick={handleClickCreate}>
              Create
            </ClickingButton>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={7} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <StyledImage src="/background.png" alt="Description of the background" />
        </Grid>
      </Container>
    </>
  )
}
