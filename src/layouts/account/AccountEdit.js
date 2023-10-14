/**
 * Author: Kien Quoc Mai
 * Created date: 19/08/2023
 * Last modified Date: 29/09/2023
 */
import { useEffect, useState } from 'react'
import useResponsive from '@/hooks/useResponsive'
import { Dialog, Avatar, IconButton, styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import TextFieldWithLabel from '../../components/TextFieldWithLabel'

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

const UploadInput = styled('input')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  inset: '0',
  opacity: '0',
  cursor: 'pointer',
}))

/**
 *
 * @param {object} userInfo user details
 * @param {boolean} open open state
 * @param {function} handleClose function to handle close
 * @param {function} handleSubmit function to handle submit account edit
 * @returns {JSX.Element}
 */
export default function AccountEdit({ userInfo, open, handleClose, handleSubmit }) {
  const [avatar, setAvatar] = useState(userInfo.user_image)
  const [username, setUsername] = useState(userInfo.user_name || '')
  const [email, setEmail] = useState(userInfo.user_email || '')
  const fullScreen = useResponsive('down', 'sm')
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    setAvatarUrl('')
    setAvatar(userInfo.user_image)
    setUsername(userInfo.user_name || '')
    setEmail(userInfo.user_email || '')
  }, [userInfo])

  const handleClickSubmit = async () => {
    setLoading(true)
    try {
      await handleSubmit(avatar, username, email)
      handleClose()
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    setAvatar(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatarUrl(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <DialogStyled open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth>
      <CloseButton onClick={handleClose}>
        <CloseRoundedIcon />
      </CloseButton>
      <AvatarContainer>
        <Avatar
          id="avatar-edit"
          src={avatarUrl || `data:image/png;base64,${avatar}`}
          sx={{ width: '120px', height: '120px', pointerEvents: 'none' }}
        />
        <IconButton id="avatar-edit-button">
          <EditRoundedIcon />
        </IconButton>
        <UploadInput type="file" onChange={handleAvatarChange} />
      </AvatarContainer>
      <TextFieldWithLabel
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextFieldWithLabel label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <LoadingButton variant="contained" onClick={handleClickSubmit} loading={loading}>
        Save
      </LoadingButton>
    </DialogStyled>
  )
}
