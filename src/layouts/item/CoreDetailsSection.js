/**
 * Author: Kien Quoc Mai
 * Created date: 23/08/2023
 * Last modified Date: 22/09/2023
 */
import { useMemo, useState } from 'react'
import useResponsive from '@/hooks/useResponsive'
import { Stack, Typography, Button, Avatar, Skeleton, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import EthereumIcon from '@/components/EthereumIcon'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded'
import { walletAddressFormat } from '@/utils/format'

const BoldText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}))

/**
 * Core details section for an item including:
 * name, owner, price, history, action buttons
 *
 * @param {object} owner details of the owner
 * @param {boolean} ownerLoading whether the owner is loading or not
 * @param {object} item details of the item
 * @param {string} description description of the item
 * @param {boolean} showActionButtons whether to show action buttons or not
 * @param {function} onTakeOver take over button handler
 * @param {function} onAddToCart add to cart button handler
 * @returns {JSX.Element}
 */
export default function CoreDetailsSection({
  owner,
  ownerLoading,
  item,
  description,
  showActionButtons = true,
  onTakeOver,
  onAddToCart,
}) {
  const isSm = useResponsive('down', 'sm')
  const [takeOverLoading, setTakeOverLoading] = useState(false)
  const [addToCartLoading, setAddToCartLoading] = useState(false)

  const handleTakeOver = async () => {
    setTakeOverLoading(true)
    try {
      await onTakeOver()
    } finally {
      setTakeOverLoading(false)
    }
  }

  const handleAddToCart = async () => {
    setAddToCartLoading(true)
    try {
      await onAddToCart()
    } finally {
      setAddToCartLoading(false)
    }
  }

  return (
    <Stack spacing={2} gap={3} height="100%">
      <Stack
        spacing={2}
        direction={{ sm: 'column', md: 'row' }}
        justifyContent="space-between"
        gap={2}
        rowGap={1}
      >
        <BoldText>{item.name}</BoldText>
        <Stack direction="row" alignItems="center" gap={1.5}>
          {ownerLoading ? (
            <>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" width={100} height={40} />
            </>
          ) : (
            <>
              <Avatar sizes="small" src={owner.image} />
              <Stack>
                <Typography variant="body1">{owner.username}</Typography>
                <Typography variant="subtitle1">{walletAddressFormat(owner.address)}</Typography>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>

      <Stack
        gap={6}
        direction={{ xs: 'column-reverse', md: 'column' }}
        justifyContent="space-between"
        height="100%"
      >
        <Stack spacing={1}>
          <Typography variant="h3">Description</Typography>
          <Typography variant="body1">{description}</Typography>
        </Stack>

        <Stack gap={1.25}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <BoldText>Price</BoldText>
            <Stack direction="row" gap={1} alignItems="center">
              <EthereumIcon size={isSm ? 13 : 18} />
              <BoldText>{item.price}</BoldText>
            </Stack>
          </Stack>
          {showActionButtons && (
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.75} rowGap={1.25}>
              <LoadingButton
                fullWidth
                variant="contained"
                onClick={handleTakeOver}
                loading={takeOverLoading}
              >
                Buy
              </LoadingButton>
              <LoadingButton
                variant="outlined"
                sx={{ minWidth: '20%' }}
                onClick={handleAddToCart}
                loading={addToCartLoading}
              >
                <AddShoppingCartRoundedIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem' } }} />
              </LoadingButton>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
