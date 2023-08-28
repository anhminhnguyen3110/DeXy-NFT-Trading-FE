import { Checkbox, styled } from '@mui/material'

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  paddingInline: 0,
  '& .MuiSvgIcon-root': {
    width: '1.5rem',
    height: '1.5rem',
    color: theme.palette.primary.dark,
  },
}))

export default function CheckboxComponent({ label = 'label', defaultChecked = false, ...props }) {
  return (
    <StyledCheckbox
      disableRipple
      label={label}
      defaultChecked={defaultChecked ? true : false}
      {...props}
    />
  )
}
