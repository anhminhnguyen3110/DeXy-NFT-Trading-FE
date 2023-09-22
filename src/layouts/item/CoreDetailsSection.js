/**
 * Author: Kien Quoc Mai
 * Created date: 23/08/2023
 * Last modified Date: 22/09/2023
 */
import { useMemo, useState } from 'react'
import useResponsive from '@/hooks/useResponsive'
import { Stack, Typography, Button, Avatar, Skeleton, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import DynamicTable from '@/components/DynamicTable'
import PaginationButtons from '@/components/Pagination'
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

const columns = [
  { id: 'price', label: 'Price', align: 'left' },
  { id: 'date', label: 'Date', align: 'left' },
  { id: 'fromUser', label: 'From user', align: 'left' },
]

/**
 * Core details section for an item including:
 * name, owner, price, history, action buttons
 *
 * @param {object} owner details of the owner
 * @param {object} item details of the item
 * @param {object} offers offers history
 * @param {boolean} offerLoading loading state of the offers
 * @param {int} offerPage current page of the offers
 * @param {int} offerMaxPage maximum page of the offers
 * @param {function} handleOfferPageChange page change handler
 * @param {boolean} showActionButtons whether to show action buttons or not
 * @param {function} onPlaceOffer place offer button handler
 * @param {function} onTakeOver take over button handler
 * @returns {JSX.Element}
 */
export default function CoreDetailsSection({
  owner,
  item,
  offers,
  offerLoading,
  offerPage,
  offerMaxPage,
  handleOfferPageChange,
  showActionButtons = true,
  onPlaceOffer,
  onTakeOver,
}) {
  const isSm = useResponsive('down', 'sm')
  const rows = useMemo(
    () =>
      offers.map((offer) => ({
        price: (
          <Stack direction="row" gap={1} alignItems="center">
            <EthereumIcon size={10} />
            <Typography>{offer.offer_price}</Typography>
          </Stack>
        ),
        date: offer.offer_date,
        fromUser: (
          <Typography color="primary.main">
            {walletAddressFormat(offer.offer_from_user_address)}
          </Typography>
        ),
      })),
    [offers]
  )
  const [takeOverLoading, setTakeOverLoading] = useState(false)

  const handleTakeOver = async () => {
    setTakeOverLoading(true)
    try {
      await onTakeOver()
    } finally {
      setTakeOverLoading(false)
    }
  }

  return (
    <Stack spacing={2} gap={3}>
      <Stack
        spacing={2}
        direction={{ sm: 'column', md: 'row' }}
        justifyContent="space-between"
        gap={2}
        rowGap={1}
      >
        <BoldText>{item.name}</BoldText>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Avatar sizes="small" src={owner.image} />
          <Stack>
            <Typography variant="body1">{owner.username}</Typography>
            <Typography variant="subtitle1">{owner.address.slice(0, 8)}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack gap={3} direction={{ xs: 'column-reverse', md: 'column' }}>
        <Stack spacing={1}>
          <Typography fontSize="1.25rem">Offer</Typography>
          <DynamicTable
            columns={columns}
            data={
              !offerLoading
                ? rows
                : Array.from({ length: 5 }).map((_, index) => ({
                    price: <Skeleton variant="rounded" height={25} width={75} />,
                    date: <Skeleton variant="rounded" height={25} width={130} />,
                    fromUser: <Skeleton variant="rounded" height={25} width={115} />,
                  }))
            }
          />
          <PaginationButtons
            page={offerPage}
            pageCount={offerMaxPage}
            handlePageChange={handleOfferPageChange}
            sx={{ alignSelf: 'center' }}
          />
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
                Take over
              </LoadingButton>
              <Stack direction="row" gap={1.75} sx={{ display: { xs: 'flex', sm: 'contents' } }}>
                <Button fullWidth variant="outlined" onClick={onPlaceOffer}>
                  Make an offer
                </Button>
                <Button variant="contained" sx={{ minWidth: '3.5rem' }}>
                  <AddShoppingCartRoundedIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem' } }} />
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
