import { FormControl, InputBase, InputLabel, styled } from '@mui/material'

const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.3rem',
  paddingLeft: theme.spacing(1),
  '&.Mui-focused': {
    color: theme.palette.text.primary,
  },
}))

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

export default function TextFieldWithLabel({ label, value, onChange, ...props }) {
  return (
    <FormControl fullWidth variant="standard">
      <InputLabelStyled shrink>{label}</InputLabelStyled>
      <InputBaseStyled value={value} onChange={onChange} {...props} />
    </FormControl>
  )
}

export const InputBaseStyledMarketplace = styled(InputBaseStyled)(({ theme }) => ({
  maxWidth: '3.5625rem',
  paddingLeft: theme.spacing(1),
}))
