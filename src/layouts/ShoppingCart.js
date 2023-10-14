/**
 * Author: Kien Quoc Mai, Duy Khoa Pham
 * Created date: 16/08/2023
 * Last modified Date: 22/09/2023
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount, useContractWrite, useFeeData, usePublicClient } from 'wagmi'
import { parseEther, getAddress } from 'viem'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import useResponsive from '@/hooks/useResponsive'
import axios from '@/utils/axios'
import {
  Dialog,
  IconButton,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Divider,
  styled,
  useTheme,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded'
import EthereumIcon from '@/components/EthereumIcon'
import { walletAddressFormat } from '@/utils/format'
import contractAbi from '@/utils/contractAbi.json'

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    paddingTop: theme.spacing(5),
  },
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[300],
}))

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '4.5rem',
  aspectRatio: '1/1',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}))

const TotalTextStyle = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: '1.5rem',
}))

/**
 * Shopping cart popup
 * @param {boolean} open open state
 * @param {function} handleClose function to handle close
 * @returns {JSX.Element}
 */
export default function ShoppingCart({ open, handleClose }) {
  const fullScreen = useResponsive('down', 'sm')
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [removeItemLoading, setRemoveItemLoading] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const totalPrice = useMemo(
    () => Math.round(cartItems.reduce((acc, item) => acc + item.item_fixed_price, 0) * 1000) / 1000,
    [cartItems]
  )
  const theme = useTheme()
  const { address: userAddress, isConnected } = useAccount()
  const { writeAsync: writeContract } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: 'batchBuy',
  })

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true)
      try {
        const {
          data: { data },
        } = await axios.get('/shopping-cart-items')
        setCartItems(data ?? [])
      } catch (error) {
        enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to fetch cart items', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }
    if (isConnected && open) fetchCartItems()
  }, [enqueueSnackbar, isConnected, open])

  const handleSubmit = async () => {
    setSubmitLoading(true)
    try {
      await writeContract({
        args: [
          cartItems.map((item) => getAddress(item.item_owner_address)),
          cartItems.map((item) => parseInt(item.item_id)),
          cartItems.map((item) => parseEther(item.item_fixed_price.toString())),
        ],
        value: cartItems.reduce(
          (acc, item) => acc + parseEther(item.item_fixed_price.toString()),
          0n
        ),
        from: getAddress(userAddress),
      })
      // refresh page if on marketplace or item page /item/id with the id of the items in cart
      console.log(router.pathname, router.query.id, cartItems)
      if (
        router.pathname === '/marketplace' ||
        (router.pathname.startsWith('/item') &&
          cartItems.some((item) => router.query.id == item.item_id))
      ) {
        router.reload()
      }
      handleClose()
      setCartItems([])

      enqueueSnackbar('Order placed successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to place order', {
        variant: 'error',
      })
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleRemoveItem = async (index) => {
    const deletedItem = cartItems[index]
    setRemoveItemLoading(true)
    try {
      // optimistic update
      setCartItems((prev) => prev.filter((_, i) => i !== index))
      await axios.delete(`/shopping-cart-items/${cartItems[index].item_id}`)
      enqueueSnackbar('Item removed successfully', { variant: 'success' })
    } catch (error) {
      // rollback
      setCartItems((prev) => [...prev.slice(0, index), deletedItem, ...prev.slice(index)])
      enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to remove item', {
        variant: 'error',
      })
    } finally {
      setRemoveItemLoading(false)
    }
  }

  const handleRemoveAll = async () => {
    const deletedItems = cartItems
    setRemoveItemLoading(true)
    try {
      // optimistic update
      setCartItems([])
      await Promise.all(
        deletedItems.map((item) => axios.delete(`/shopping-cart-items/${item.item_id}`))
      )
      enqueueSnackbar('All items removed successfully', { variant: 'success' })
    } catch (error) {
      // rollback
      setCartItems(deletedItems)
      enqueueSnackbar(error?.response?.data?.detail ?? 'Failed to remove items', {
        variant: 'error',
      })
    } finally {
      setRemoveItemLoading(false)
    }
  }

  const handleClickItem = useCallback(() => {
    if (!router) return () => {}
    return (id) => {
      handleClose()
      router.push(`/item/${id}`)
    }
  }, [router, handleClose])

  return (
    <DialogStyled
      open={open}
      onClose={submitLoading ? null : handleClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xs"
    >
      <CloseButton onClick={submitLoading ? null : handleClose}>
        <CloseRoundedIcon />
      </CloseButton>
      <Stack gap={2.5} justifyContent="stretch">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h2">My Cart</Typography>
          {!loading && cartItems.length > 0 && (
            <Button variant="text" color="info" onClick={handleRemoveAll} disabled={submitLoading}>
              Clear all
            </Button>
          )}
        </Stack>
        {loading ? (
          <CircularProgress sx={{ margin: '5rem auto' }} />
        ) : (
          <>
            {cartItems.map((item, index) => (
              <Stack
                key={`cart-item-${item.item_id}`}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={{ xs: 1, sm: 2 }}
              >
                <ImageContainer onClick={() => handleClickItem()(index)}>
                  <Image
                    src={`data:image/png;base64,${item.item_image}`}
                    fill
                    alt={`Cart item ${index}`}
                  />
                </ImageContainer>
                <Stack gap={0.25} alignSelf="flex-start">
                  <Typography variant="body1">{item.item_name}</Typography>
                  <Typography variant="subtitle1">
                    {walletAddressFormat(item.item_owner_address)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  gap={0.8}
                  alignItems="center"
                  justifyContent="flex-end"
                  marginLeft="auto"
                >
                  <IconButton
                    sx={{ marginRight: { xs: '0.4rem', sm: '0.9rem' } }}
                    onClick={() => handleRemoveItem(index)}
                    disabled={removeItemLoading || submitLoading}
                  >
                    <RemoveShoppingCartRoundedIcon />
                  </IconButton>
                  <EthereumIcon size={12} />
                  <Typography variant="body1">{item.item_fixed_price}</Typography>
                </Stack>
              </Stack>
            ))}
            {cartItems.length === 0 ? (
              <Typography sx={{ marginBottom: '1rem' }}>
                Your cart is empty. Checkout the{' '}
                <Link
                  onClick={handleClose}
                  href="/marketplace"
                  style={{ color: theme.palette.primary.main, fontWeight: '500' }}
                >
                  Marketplace
                </Link>{' '}
                for DeXy items.
              </Typography>
            ) : (
              <>
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <TotalTextStyle>Total price</TotalTextStyle>
                  <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    justifyContent="flex-end"
                    marginLeft="auto"
                  >
                    <EthereumIcon size={14} />
                    <TotalTextStyle>{totalPrice}</TotalTextStyle>
                  </Stack>
                </Stack>
                <LoadingButton
                  variant="contained"
                  onClick={handleSubmit}
                  loading={submitLoading}
                  disabled={!isConnected || removeItemLoading}
                >
                  Place order
                </LoadingButton>
              </>
            )}
          </>
        )}
      </Stack>
    </DialogStyled>
  )
}
