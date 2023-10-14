/**
 * Author: Kien Quoc Mai
 * Created date: 23/08/2023
 * Last modified Date: 22/09/2023
 */
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useAccount, useContractWrite } from 'wagmi'
import { useSnackbar } from 'notistack'
import { parseEther, getAddress } from 'viem'
import axios from '@/utils/axios'
import Image from 'next/image'
import Head from 'next/head'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Stack, Typography, Grid, Skeleton, styled, useTheme } from '@mui/material'
import GridV2 from '@mui/material/Unstable_Grid2'
import ActionAreaCard from '@/components/Card'
import CoreDetailsSection from '@/layouts/item/CoreDetailsSection'
import NonSsrWrapper from '@/utils/NonSsrWrapper'
import { walletAddressFormat } from '@/utils/format'
import contractAbi from '@/utils/contractAbi.json'

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
  const { enqueueSnackbar } = useSnackbar()
  const [itemLoading, setItemLoading] = useState(true)
  const [itemCoreDetails, setItemCoreDetails] = useState({
    name: '',
    image: '',
    price: 0,
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
  const [ownerLoading, setOwnerLoading] = useState(true)
  const [moreItemsFromUserLoading, setMoreItemsFromUserLoading] = useState(true)
  const [moreItemsFromUser, setMoreItemsFromUser] = useState([])
  const { writeAsync: writeContract } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: 'buy',
  })

  useEffect(() => {
    const fetchItem = async () => {
      setItemLoading(true)
      try {
        const {
          data: { data: itemData },
        } = await axios.get(`/items/${id}`)

        setItemCoreDetails({
          name: itemData.item_name,
          image: itemData.item_image,
          price: itemData.item_fixed_price,
        })
        setItemMetadata({
          description: itemData.item_description,
          createdDate: itemData.item_created_date,
          createdBy: itemData.item_created_by_address,
          category: itemData.item_category_name,
        })
        setItemOwner({
          username: '',
          address: itemData.item_owner_address,
          image: '',
        })
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.detail ?? 'Error while fetching item', {
          variant: 'error',
        })
      } finally {
        setItemLoading(false)
      }
    }
    if (id) fetchItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, enqueueSnackbar])

  useEffect(() => {
    const fetchMoreItemsFromUser = async () => {
      setMoreItemsFromUserLoading(true)
      try {
        const {
          data: { data: moreItemsFromUserData },
        } = await axios.get(
          `/items?limit=10&page=1&user_wallet_address=${itemOwner.address}&sort_by=NEWEST`
        )
        setMoreItemsFromUser(moreItemsFromUserData)
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.detail ?? 'Error while fetching more items from user',
          { variant: 'error' }
        )
      } finally {
        setMoreItemsFromUserLoading(false)
      }
    }
    const fetchItemOwner = async () => {
      setOwnerLoading(true)
      try {
        const {
          data: { data: ownerData },
        } = await axios.get(`/users/${itemOwner.address}`)
        setItemOwner({
          username: ownerData.user_name,
          address: itemOwner.address,
          image: ownerData.user_image,
        })
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.detail ?? 'Error while fetching item owner', {
          variant: 'error',
        })
      } finally {
        setOwnerLoading(false)
      }
    }

    if (itemOwner.address) {
      fetchMoreItemsFromUser()
      fetchItemOwner()
    }
  }, [itemOwner.address, enqueueSnackbar])

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

  const handleTakeOver = async () => {
    try {
      await writeContract({
        args: [
          getAddress(itemOwner.address),
          parseInt(id),
          parseEther(itemCoreDetails.price.toString()),
        ],
        value: parseEther(itemCoreDetails.price.toString()),
        from: getAddress(userAddress),
      })
      setItemOwner((prev) => ({ ...prev, address: userAddress }))
      enqueueSnackbar('Order processed successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.detail ?? 'Error while processing the order. Please try again.',
        { variant: 'error' }
      )
    }
  }

  const handleAddToCart = async () => {
    try {
      await axios.post('/shopping-cart-items/add-item', {
        item_id: id,
      })
      enqueueSnackbar('Added to cart successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.detail ?? 'Error while adding to cart', {
        variant: 'error',
      })
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
                    ownerLoading={ownerLoading}
                    description={itemMetadata.description}
                    item={itemCoreDetails}
                    metadata={itemMetadata}
                    handleOfferPageChange={handleOfferPageChange}
                    showActionButtons={
                      isConnected && itemOwner.address && itemOwner.address !== userAddress
                    }
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
                    <Image
                      src={`data:image/png;base64,${itemCoreDetails.image}`}
                      alt={`image-${id}`}
                      fill
                      priority
                    />
                  </ImageContainer>
                )}
              </GridV2>
            </GridV2>
          </Grid>

          <Grid item xs={12} marginTop={4}>
            <Typography variant="h3" gutterBottom>
              More from this user
            </Typography>
            <CarouselStyled
              responsive={carouselResponsiveConfig}
              infinite={true}
              keyBoardControl={true}
            >
              {itemLoading || moreItemsFromUserLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      variant="rounded"
                      height={270}
                      width={200}
                      key={`more-from-this-user-loading-${index}`}
                    />
                  ))
                : moreItemsFromUser.map((item) => (
                    <ActionAreaCard
                      userAddress={item.item_owner_address}
                      key={`item-details-item-${item.item_id}`}
                      image={item.item_image}
                      title={item.item_name}
                      price={item.item_fixed_price}
                      onClick={() => router.push(`/item/${item.item_id}`)}
                      sx={{ width: '70%' }}
                    />
                  ))}
            </CarouselStyled>
          </Grid>
        </Grid>
      </NonSsrWrapper>
    </>
  )
}
