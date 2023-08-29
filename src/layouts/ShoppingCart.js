/**
 * Author: Kien Quoc Mai, Duy Khoa Pham
 * Created date: 16/08/2023
 * Last modified Date: 26/08/2023
 */
import { useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import useResponsive from '@/hooks/useResponsive'
import { Dialog, IconButton, Button, Typography, Stack, styled, Divider } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded'
import EthereumIcon from '@/components/EthereumIcon'

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

  const handleClickSubmit = () => {
    handleClose()
    enqueueSnackbar('Order is placed', { variant: 'success' })
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
          <Button variant="text" color="info">
            Clear all
          </Button>
        </Stack>
        {Array.from({ length: 3 }).map((_, index) => (
          <Stack
            key={`cart-item-${index}`}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={{ xs: 1, sm: 2 }}
          >
            <ImageContainer onClick={() => handleClickItem()(index)}>
              <Image src="/space-doge-md.jpeg" fill alt={`Cart item ${index}`} />
            </ImageContainer>
            <Stack gap={0.25} alignSelf="flex-start">
              <Typography variant="body1">Space Doge</Typography>
              <Typography variant="subtitle1">abcxyz</Typography>
            </Stack>
            <Stack
              direction="row"
              gap={0.8}
              alignItems="center"
              justifyContent="flex-end"
              marginLeft="auto"
            >
              <IconButton sx={{ marginRight: { xs: '0.4rem', sm: '0.9rem' } }}>
                <RemoveShoppingCartRoundedIcon />
              </IconButton>
              <EthereumIcon size={12} />
              <Typography variant="body1">0.7</Typography>
            </Stack>
          </Stack>
        ))}
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
            <TotalTextStyle>2.1</TotalTextStyle>
          </Stack>
        </Stack>
        <Button variant="contained" onClick={handleClickSubmit}>
          Place order
        </Button>
      </Stack>
    </DialogStyled>
  )
}
