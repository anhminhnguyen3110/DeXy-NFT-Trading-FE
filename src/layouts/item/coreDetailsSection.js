/**
 * Author: Kien Quoc Mai
 * Created date: 23/08/2023
 * Last modified Date: 29/08/2023
 */
import useResponsive from '@/hooks/useResponsive'
import { Stack, Typography, Button, Avatar, styled } from '@mui/material'
import DynamicTable from '@/components/DynamicTable'
import PaginationButtons from '@/components/Pagination'
import EthereumIcon from '@/components/EthereumIcon'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded'

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

const rows = [
  {
    price: (
      <Stack direction="row" gap={1} alignItems="center">
        <EthereumIcon size={10} /> 0.45
      </Stack>
    ),
    date: '8/12/2023 03:44 PM',
    fromUser: <Typography color="primary.main">abcdxyz</Typography>,
  },
  {
    price: (
      <Stack direction="row" gap={1} alignItems="center">
        <EthereumIcon size={10} /> 0.45
      </Stack>
    ),
    date: '8/12/2023 03:44 PM',
    fromUser: <Typography color="primary.main">abcdxyz</Typography>,
  },
  {
    price: (
      <Stack direction="row" gap={1} alignItems="center">
        <EthereumIcon size={10} /> 0.45
      </Stack>
    ),
    date: '8/12/2023 03:44 PM',
    fromUser: <Typography color="primary.main">abcdxyz</Typography>,
  },
]

/**
 * Core details section for an item including:
 * name, owner, price, history, action buttons
 * @returns {JSX.Element}
 */
export default function CoreDetailsSection() {
  const isSm = useResponsive('down', 'sm')

  return (
    <Stack spacing={2} gap={3}>
      <Stack
        spacing={2}
        direction={{ sm: 'column', md: 'row' }}
        justifyContent="space-between"
        gap={2}
        rowGap={1}
      >
        <BoldText>{'Bean #14525'}</BoldText>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Avatar sizes="small" />
          <Stack>
            <Typography variant="body1">User</Typography>
            <Typography variant="subtitle1">abcdxyz</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack gap={3} direction={{ xs: 'column-reverse', md: 'column' }}>
        <Stack spacing={1}>
          <Typography fontSize="1.25rem">Offer</Typography>
          <DynamicTable columns={columns} data={rows} />
          <PaginationButtons sx={{ alignSelf: 'center' }} />
        </Stack>

        <Stack gap={1.25}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <BoldText>Price</BoldText>
            <Stack direction="row" gap={1} alignItems="center">
              <EthereumIcon size={isSm ? 13 : 18} />
              <BoldText>0.45</BoldText>
            </Stack>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.75} rowGap={1.25}>
            <Button fullWidth variant="contained">
              Take over
            </Button>
            <Stack direction="row" gap={1.75} sx={{ display: { xs: 'flex', sm: 'contents' } }}>
              <Button fullWidth variant="outlined">
                Make an offer
              </Button>
              <Button variant="contained" sx={{ minWidth: '3.5rem' }}>
                <AddShoppingCartRoundedIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem' } }} />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
