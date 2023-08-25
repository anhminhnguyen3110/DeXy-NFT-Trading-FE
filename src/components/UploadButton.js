import * as React from 'react'
import { styled } from '@mui/material'
import { Button, SvgIcon } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'

const VisuallyHiddenInput = styled('input')(() => ({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  width: '1px',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  marginTop: '0.94rem',
  marginLeft: '2.18rem',
  marginBottom: '1rem',
  maxWidth: '8.18856rem',
  [theme.breakpoints.down('sm')]: {
    marginTop: '1rem',
    marginLeft: '0.94rem',
    marginBottom: '1.5rem',
  },
}))

export default function InputFileUpload({ onChange, ...props }) {
  return (
    <ButtonStyled component="label" role={undefined} tabIndex={-1} variant="outlined" {...props}>
      <SvgIcon component={FileUploadIcon} />
      Upload
      <VisuallyHiddenInput onChange={onChange} type="file" />
    </ButtonStyled>
  )
}
