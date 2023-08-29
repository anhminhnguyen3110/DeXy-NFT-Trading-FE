/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen, Duy Khoa Pham
 * Created date: 25/08/2023
 * Last modified Date: 29/08/2023
 */
import { Button, SvgIcon, styled } from '@mui/material'
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
  maxWidth: '8.2rem',
}))

export default function InputFileUpload({ onChange, ...props }) {
  return (
    <ButtonStyled component="label" variant="outlined" {...props}>
      <SvgIcon component={FileUploadIcon} />
      Upload
      <VisuallyHiddenInput onChange={onChange} type="file" />
    </ButtonStyled>
  )
}
