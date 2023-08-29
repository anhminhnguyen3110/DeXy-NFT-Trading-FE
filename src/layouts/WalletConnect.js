/**
 * Author: Kien Quoc Mai, Duy Khoa Pham
 * Created date: 25/08/2023
 * Last modified Date: 29/08/2023
 */
import { useState } from 'react'
import useResponsive from '@/hooks/useResponsive'
import { Dialog, IconButton, Select, MenuItem, Typography, styled, alpha } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Image from 'next/image'

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    paddingTop: theme.spacing(5),
  },
}))

const ImageContainer = styled('div')(() => ({
  position: 'relative',
  width: '90%',
  maxWidth: '18rem',
  aspectRatio: '1/1',
  '& img': {
    fit: 'contain',
  },
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[400],
}))

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  textWrap: 'balance',
  textAlign: 'center',
}))

const SelectStyled = styled(Select)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 'bold',
  height: '2.8rem',
  '& .MuiInputBase-input': {
    paddingLeft: '2.2rem',
    paddingRight: '2.5rem !important',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.grey[500]} !important`,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.grey[500], 0.8),
  },
  '& .MuiSelect-icon': {
    color: theme.palette.grey[500],
  },
}))

export default function WalletConnect({ open, handleClose }) {
  const fullScreen = useResponsive('down', 'sm')
  const [wallet, setWallet] = useState('metamask')

  return (
    <DialogStyled open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth maxWidth="xs">
      <CloseButton onClick={handleClose}>
        <CloseRoundedIcon />
      </CloseButton>
      <SelectStyled value={wallet} onChange={(e) => setWallet(e.target.value)}>
        <MenuItem value="metamask">Metamask</MenuItem>
        <MenuItem value="walletconnect">WalletConnect</MenuItem>
        <MenuItem value="walletlink">WalletLink</MenuItem>
      </SelectStyled>
      <Description>Scan QR code with a WalletConnect-compatible wallet</Description>
      <ImageContainer>
        <Image src="/qr-code.jpeg" alt="QR code to connect a wallet" fill />
      </ImageContainer>
    </DialogStyled>
  )
}
