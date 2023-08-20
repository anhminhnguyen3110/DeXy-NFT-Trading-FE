import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '& .MuiSvgIcon-root': {
    width: '1.5rem',
    height: '1.5rem',
    color: theme.palette.primary.dark,
  },
}))

export default function CheckboxComponent({ label = 'label', defaultChecked = false, ...props }) {
  return <StyledCheckbox label={label} defaultChecked={defaultChecked ? true : false} {...props} />
}
