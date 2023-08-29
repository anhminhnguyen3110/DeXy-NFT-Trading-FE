/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 19/08/2023
 * Last modified Date: 29/08/2023
 */
import { FormControl, InputLabel, styled } from '@mui/material'
import InputBase from '@/components/InputBase'

const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.3rem',
  paddingLeft: theme.spacing(1),
  '&.Mui-focused': {
    color: theme.palette.text.primary,
  },
}))

export default function TextFieldWithLabel({ label, value, onChange, ...props }) {
  return (
    <FormControl fullWidth variant="standard">
      <InputLabelStyled shrink>{label}</InputLabelStyled>
      <InputBase value={value} onChange={onChange} {...props} />
    </FormControl>
  )
}
