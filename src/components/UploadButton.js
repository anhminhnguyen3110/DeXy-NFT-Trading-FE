import * as React from 'react'
import { styled } from '@mui/material'
import { Button, SvgIcon } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`

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

export default function InputFileUpload() {
  return (
    <ButtonStyled component="label" role={undefined} tabIndex={-1} variant="outlined">
      <SvgIcon component={FileUploadIcon} />
      Upload
      <VisuallyHiddenInput type="file" />
    </ButtonStyled>
  )
}
