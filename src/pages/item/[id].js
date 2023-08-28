import { useMemo } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Stack, Typography, styled, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import ActionAreaCard from '@/components/Card'
import CoreDetailsSection from '@/layouts/item/CoreDetailsSection'

const CarouselStyled = styled(Carousel)(({ theme }) => ({
  paddingBlock: theme.spacing(1),
  '& .react-multiple-carousel__arrow': {
    backgroundColor: 'transparent',
    '&::before': {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  },
  '& .react-multi-carousel-item': {
    display: 'flex',
    justifyContent: 'center',
  },
  '& .react-multiple-carousel__arrow--left': {
    left: 0,
  },
  '& .react-multiple-carousel__arrow--right': {
    right: 0,
  },
}))

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '1/1',
  minHeight: '15rem',
  maxHeight: '32rem',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'black',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    maxWidth: 'min(24rem, 100%)',
    marginInline: 'auto',
  },
  '& img': {
    objectFit: 'contain',
  },
}))

export default function ItemDetail() {
  // get the id from the url query
  const router = useRouter()
  const { id } = router.query
  const theme = useTheme()

  const carouselResponsiveConfig = useMemo(
    () =>
      theme
        ? {
            superLargeDesktop: {
              breakpoint: { max: 4000, min: theme.breakpoints.values.xl },
              items: 5,
            },
            desktop: {
              breakpoint: { max: theme.breakpoints.values.xl, min: theme.breakpoints.values.md },
              items: 4,
            },
            tablet: {
              breakpoint: { max: theme.breakpoints.values.md, min: theme.breakpoints.values.sm },
              items: 2,
            },
            mobile: {
              breakpoint: { max: theme.breakpoints.values.sm, min: theme.breakpoints.values.xs },
              items: 1,
            },
          }
        : {},
    [theme]
  )

  return (
    <>
      <Head>
        <title>DeXy | Item details</title>
      </Head>
      <Grid container spacing={6} marginY={3}>
        <Grid container xs={12} spacing={4} direction={{ xs: 'column-reverse', md: 'row' }}>
          <Grid xs={12} md={7}>
            <CoreDetailsSection />
          </Grid>
          <Grid xs={12} md={5}>
            <ImageContainer>
              <Image src="/bean.png" alt={`image-${id}`} fill priority />
            </ImageContainer>
          </Grid>
        </Grid>
        <Grid xs={12} md={7}>
          <Typography variant="h3" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" maxWidth="60ch">
            Lorem ipsum dolor sit amet. Sed iure ipsam ut libero odit aut earum assumenda aut esse
            perspiciatis sit voluptates consequuntur sit omnis commodi qui neque dolores. Ut quia
            quia ab fugiat velit et rerum aspernatur vel veniam asperiores sed voluptas aperiam qui
            reprehenderit molestiae et quae quas. Vel dicta similique aut natus illum est mollitia
            consequuntur.
          </Typography>
        </Grid>
        <Grid xs={12} md={5}>
          <Typography variant="h3" gutterBottom>
            Asset detail
          </Typography>
          <Stack gap="0.2rem">
            <Typography variant="body1">Created date: 19/08/2023</Typography>
            <Typography variant="body1">Created by: abcxyz</Typography>
            <Typography variant="body1">Owned by: abcxyz</Typography>
            <Typography variant="body1">Fix price: 0.09</Typography>
          </Stack>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h3" gutterBottom>
            More from this user
          </Typography>
          <CarouselStyled
            responsive={carouselResponsiveConfig}
            infinite={true}
            keyBoardControl={true}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <ActionAreaCard
                key={`more-from-this-user-${index}`}
                image="/space-doge-md.jpeg"
                title={`Space Doge ${index + 1}`}
                price={Math.round(0.09 * (index + 1) * 100) / 100}
                onClick={() => router.push(`/item/${index + 1}`)}
              />
            ))}
          </CarouselStyled>
        </Grid>
      </Grid>
    </>
  )
}
