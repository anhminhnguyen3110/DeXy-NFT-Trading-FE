/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen, Duy Khoa Pham
 * Created date: 20/08/2023
 * Last modified Date: 29/08/2023
 */
import { Checkbox, styled } from '@mui/material'

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  paddingInline: 0,
  '& .MuiSvgIcon-root': {
    width: '1.5rem',
    height: '1.5rem',
    color: theme.palette.primary.dark,
  },
}))

/**
 *
 * @param {string} label label of checkbox
 * @param {boolean} defaultChecked default value
 * @param {object} props other props
 * @returns {JSX.Element}
 */
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
