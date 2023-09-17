/**
 * Author: Kien Quoc Mai
 * Created date: 17/09/2023
 * Last modified Date: 17/09/2023
 */
import { useState } from 'react'
import useResponsive from '@/hooks/useResponsive'
import { Dialog, IconButton, Button, Stack, Typography, styled } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import TextFieldWithLabel from '../../components/TextFieldWithLabel'
import { useSnackbar } from 'notistack'
import EthereumIcon from '@/components/EthereumIcon'
import CheckboxComponent from '@/components/CheckBox'

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '22rem',
    },
  },
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[300],
}))

/**
 *
 * @param {boolean} open open state
 * @param {function} handleClose function to handle close
 * @param {function} handleSubmit function to handle submit account edit
 * @param {number} balance balance of the user
 * @param {string} itemName item name
 * @returns {JSX.Element}
 */
export default function PlaceOffer({ open, handleClose, handleSubmit, balance, itemName }) {
  const [price, setPrice] = useState(0)
  const fullScreen = useResponsive('down', 'sm')
  const { enqueueSnackbar } = useSnackbar()

  const handleClickSubmit = () => {
    handleSubmit(price)
    handleClose()
    enqueueSnackbar('Profile updated', { variant: 'success' })
  }

  return (
    <DialogStyled open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth>
      <CloseButton onClick={handleClose}>
        <CloseRoundedIcon />
      </CloseButton>
      <Stack gap={2.5} justifyContent="stretch">
        <Typography variant="h2">Place an offer</Typography>
        <TextFieldWithLabel
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
        <Stack gap={1}>
          <Typography variant="h5" style={{ fontSize: '1.1rem' }}>
            Offer details
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">Item:</Typography>
            <Typography variant="body1">{itemName}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">Balance:</Typography>
            <Stack direction="row" gap={1} sx={{ marginLeft: 'auto' }} alignItems="center">
              <EthereumIcon size={10} />
              {balance}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" gap={1} alignItems="center">
          <CheckboxComponent />
          <Typography variant="body2">I agree to the terms and conditions</Typography>
        </Stack>
        <Button variant="contained" onClick={handleClickSubmit}>
          Place your offer
        </Button>
      </Stack>
    </DialogStyled>
  )
}
