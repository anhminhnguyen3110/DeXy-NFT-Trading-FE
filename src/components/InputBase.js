/**
 * Author: Kien Quoc Mai, Duy Khoa Pham
 * Created date: 28/08/2023
 * Last modified Date: 29/08/2023
 */
import { InputBase, styled } from '@mui/material'

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3.5),
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    borderRadius: 10,
    position: 'relative',
    border: '1px solid',
    borderColor: theme.palette.grey[400],
    width: 'auto',
    flexGrow: 1,
    padding: `${theme.spacing(0.8)} ${theme.spacing(1)}`,
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}))

export default InputBaseStyled
