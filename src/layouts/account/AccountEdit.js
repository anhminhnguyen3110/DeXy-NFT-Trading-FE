/**
 * Author: Kien Quoc Mai
 * Created date: 19/08/2023
 * Last modified Date: 29/08/2023
 */
import { useState } from 'react'
import useResponsive from '@/hooks/useResponsive'
import { Dialog, Avatar, IconButton, Button, styled } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import TextFieldWithLabel from '../../components/TextFieldWithLabel'
import { useSnackbar } from 'notistack'

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20rem',
    },
  },
}))

const AvatarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 'fit-content',
  '&:hover': {
    '& #avatar-edit-button': {
      display: 'block',
    },
    '& #avatar-edit': {
      opacity: 0.5,
    },
  },
  '& #avatar-edit-button': {
    display: 'none',
    position: 'absolute',
    inset: '0px',
    margin: 'auto',
    color: theme.palette.grey[300],
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
 * @returns {JSX.Element}
 */
export default function AccountEdit({ open, handleClose, handleSubmit }) {
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const fullScreen = useResponsive('down', 'sm')
  const { enqueueSnackbar } = useSnackbar()

  const handleClickSubmit = () => {
    handleSubmit(avatar, username, email)
    handleClose()
    enqueueSnackbar('Profile updated', { variant: 'success' })
  }

  return (
    <DialogStyled open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth>
      <CloseButton onClick={handleClose}>
        <CloseRoundedIcon />
      </CloseButton>
      <AvatarContainer>
        <Avatar id="avatar-edit" sx={{ width: '120px', height: '120px' }} />
        <IconButton id="avatar-edit-button">
          <EditRoundedIcon />
        </IconButton>
      </AvatarContainer>
      <TextFieldWithLabel
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextFieldWithLabel label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button variant="contained" onClick={handleClickSubmit}>
        Save
      </Button>
    </DialogStyled>
  )
}
