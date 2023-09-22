/**
 * Author: Kien Quoc Mai
 * Created date: 23/08/2023
 * Last modified Date: 22/09/2023
 */
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useAccount, useBalance } from 'wagmi'
import { useSnackbar } from 'notistack'
import axios from '@/utils/axios'
import Image from 'next/image'
import Head from 'next/head'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Stack, Typography, Grid, Skeleton, styled, useTheme } from '@mui/material'
import GridV2 from '@mui/material/Unstable_Grid2'
import ActionAreaCard from '@/components/Card'
import CoreDetailsSection from '@/layouts/item/CoreDetailsSection'
import PlaceOffer from '@/layouts/item/PlaceOffer'
import NonSsrWrapper from '@/utils/NonSsrWrapper'
import { walletAddressFormat } from '@/utils/format'

// calculate the carousel responsive configuration based on the theme breakpoints
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

/**
 * Item detail page
 * @returns {JSX.Element}
 */
export default function ItemDetail() {
  const router = useRouter()
  const { id } = router.query
  const theme = useTheme()
  const { address: userAddress, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address: userAddress,
  })
  const [openPlaceOffer, setOpenPlaceOffer] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [itemLoading, setItemLoading] = useState(true)
  const [itemCoreDetails, setItemCoreDetails] = useState({
    name: '',
    image: '',
    price: '',
  })
  const [itemMetadata, setItemMetadata] = useState({
    description: '',
    createdDate: '',
    createdBy: '',
    category: '',
  })
  const [itemOwner, setItemOwner] = useState({
    username: '',
    address: '',
    image: '',
  })
  const [offerLoading, setOfferLoading] = useState(true)
  const [offerPage, setOfferPage] = useState(0)
  const [offerMaxPage, setOfferMaxPage] = useState(0)
  const [offersList, setOffersList] = useState([])

  useEffect(() => {
    const fetchItem = async () => {
      setItemLoading(true)
      try {
        const {
          data: { data: itemData },
        } = await axios.get(`/item/${id}`)
        const {
          data: { data: ownerData },
        } = await axios.get(`/users/${itemData.item_owner_address}`)
        const { data: offersData } = await axios.get(
          `/offers?item_id=${id}&limit=5&page=${offerPage}`
        )

        setItemCoreDetails({
          name: itemData.item_name,
          image: itemData.item_image,
          price: itemData.item_fixed_price,
        })
        setItemMetadata({
          description: itemData.item_description,
          createdDate: itemData.item_created_date,
          createdBy: itemData.item_created_by_address,
          category: itemData.item_category,
        })
        setItemOwner({
          username: ownerData.user_name,
          address: ownerData.user_address,
          image: ownerData.user_image,
        })
        setOffersList(offersData.data)
        setOfferMaxPage(Math.ceil(offersData.total_items / offersData.item_per_page))
      } catch (error) {
        enqueueSnackbar('Error while fetching item', { variant: 'error' })
      } finally {
        setItemLoading(false)
      }
    }
    if (id) fetchItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, enqueueSnackbar])

  const fetchOffers = async () => {
    setOfferLoading(true)
    try {
      const { data: offersData } = await axios.get(`/offers?${id}&limit=5&page=${offerPage}`)
      setOffersList(offersData.data)
    } catch (error) {
      enqueueSnackbar('Error while fetching offers', { variant: 'error' })
    } finally {
      setOfferLoading(false)
    }
  }

  useEffect(() => {
    if (id && enqueueSnackbar) fetchOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, enqueueSnackbar, offerPage])

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

  const handlePlaceOffer = async (price) => {
    try {
      await axios.post('/makeoffer', {
        item_id: id,
        price,
      })
      enqueueSnackbar('Offer placed successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error while processing the offer', { variant: 'error' })
    }
  }

  const handleTakeOver = async () => {
    try {
      await axios.post('/takeover', {
        item_id: id,
      })
      enqueueSnackbar('Take over successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error while taking over', { variant: 'error' })
    }
  }

  const handleAddToCart = async () => {
    try {
      await axios.post('/shopping-cart/add-item', {
        item_id: id,
      })
      enqueueSnackbar('Added to cart successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error while adding to cart', { variant: 'error' })
    }
  }

  const handleOfferPageChange = (_event, value) => {
    setOfferPage(value - 1)
    fetchOffers()
  }

  // Render the ItemDetail component
  return (
    <>
      <Head>
        <title>DeXy | Item details</title>
      </Head>
      <NonSsrWrapper>
        <Grid container spacing={6} marginBottom={4} marginTop={1}>
          <Grid container item xs={12}>
            <GridV2
              container
              spacing={5}
              direction={{ xs: 'column-reverse', md: 'row' }}
              sx={{ flexGrow: 1, width: '100%' }}
            >
              <GridV2 xs={12} md={7}>
                {itemLoading ? (
                  <Skeleton variant="rounded" height={550} />
                ) : (
                  <CoreDetailsSection
                    owner={itemOwner}
                    item={itemCoreDetails}
                    offers={offersList}
                    offerLoading={offerLoading}
                    offerPage={offerPage + 1}
                    offerMaxPage={offerMaxPage}
                    handleOfferPageChange={handleOfferPageChange}
                    showActionButtons={
                      isConnected && itemOwner.address && itemOwner.address !== userAddress
                    }
                    onPlaceOffer={() => setOpenPlaceOffer(true)}
                    onTakeOver={handleTakeOver}
                    onAddToCart={handleAddToCart}
                  />
                )}
              </GridV2>
              <GridV2 xs={12} md={5}>
                {itemLoading ? (
                  <Skeleton variant="rounded" height={500} />
                ) : (
                  <ImageContainer>
                    <Image src={itemCoreDetails.image} alt={`image-${id}`} fill priority />
                  </ImageContainer>
                )}
              </GridV2>
            </GridV2>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h3" gutterBottom>
              Description
            </Typography>
            {itemLoading ? (
              <Skeleton variant="rounded" height={160} />
            ) : (
              <Typography variant="body1" maxWidth="60ch">
                {itemMetadata.description}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h3" gutterBottom>
              Asset detail
            </Typography>
            <Stack gap="0.2rem">
              {itemLoading ? (
                <>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="text" height={40} />
                </>
              ) : (
                <>
                  <Typography variant="body1">{`Created date: ${itemMetadata.createdDate}`}</Typography>
                  <Typography variant="body1">{`Created by: ${walletAddressFormat(
                    itemMetadata.createdBy
                  )}`}</Typography>
                  <Typography variant="body1">{`Owned by: ${walletAddressFormat(
                    itemOwner.address
                  )}`}</Typography>
                  <Typography variant="body1">{`Fix price: ${itemCoreDetails.price}`}</Typography>
                </>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              More from this user
            </Typography>
            <CarouselStyled
              responsive={carouselResponsiveConfig}
              infinite={true}
              keyBoardControl={true}
            >
              {itemLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      variant="rounded"
                      height={270}
                      width={200}
                      key={`more-from-this-user-loading-${index}`}
                    />
                  ))
                : Array.from({ length: 10 }).map((_, index) => (
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
        <PlaceOffer
          open={openPlaceOffer}
          handleClose={() => setOpenPlaceOffer(false)}
          handleSubmit={handlePlaceOffer}
          balance={balance?.formatted}
          itemName={itemCoreDetails.name}
        />
      </NonSsrWrapper>
    </>
  )
}
