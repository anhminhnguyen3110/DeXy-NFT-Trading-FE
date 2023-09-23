/**
 * Author: Kien Quoc Mai, Duy Khoa Pham
 * Created date: 16/08/2023
 * Last modified Date: 22/09/2023
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
    () =>
      Math.round(
        cartItems.reduce((acc, item) => acc + item.item_fixed_price, 0),
        [cartItems] * 100
      ) / 100,
    [cartItems]
  )
  const theme = useTheme()

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true)
      try {
        const {
          data: {
            data: { items },
          },
        } = await axios.get('/shopping-cart')
        setCartItems(items)
      } catch (error) {
        enqueueSnackbar('Failed to fetch cart items', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }
    fetchCartItems()
  }, [enqueueSnackbar, open])

  const handleSubmit = async () => {
    setSubmitLoading(true)
    try {
      await axios.post('/shopping-cart/placeorder', {
        item_ids: cartItems.map((item) => item.item_id),
      })
      handleClose()
      setCartItems([])
      enqueueSnackbar('Order placed successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to place order', { variant: 'error' })
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
      await axios.delete(`/shopping-cart/remove-item`, {
        item_id: cartItems[index].item_id,
      })
      enqueueSnackbar('Item removed successfully', { variant: 'success' })
    } catch (error) {
      // rollback
      setCartItems((prev) => [...prev.slice(0, index), deletedItem, ...prev.slice(index)])
      enqueueSnackbar('Failed to remove item', { variant: 'error' })
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
        deletedItems.map((item) =>
          axios.delete(`/shopping-cart/remove-item`, {
            item_id: item.item_id,
          })
        )
      )
      enqueueSnackbar('All items removed successfully', { variant: 'success' })
    } catch (error) {
      // rollback
      setCartItems(deletedItems)
      enqueueSnackbar('Failed to remove items', { variant: 'error' })
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
    <DialogStyled open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth maxWidth="xs">
      <CloseButton onClick={handleClose}>
        <CloseRoundedIcon />
      </CloseButton>
      <Stack gap={2.5} justifyContent="stretch">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h2">My Cart</Typography>
          {!loading && cartItems.length > 0 && (
            <Button variant="text" color="info" onClick={handleRemoveAll}>
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
                  <Image src={`/${item.item_image}`} fill alt={`Cart item ${index}`} />
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
                  disabled={removeItemLoading}
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
