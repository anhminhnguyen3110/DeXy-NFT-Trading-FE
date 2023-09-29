/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 18/08/2023
 * Last modified Date: 29/09/2023
 */
import { useState } from 'react'
import { InputBase, Popover, alpha, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div', {
  shouldForwardProp: (prop) => prop !== 'shrink',
})(({ theme, shrink }) => ({
  maxHeight: '2.5rem',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  transition: theme.transitions.create('width'),
  width: '2.5rem',
  border: `1px solid ${theme.palette.grey[400]}`,
  '&:has(.MuiInputBase-input:focus)': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  ...(!shrink && {
    width: 'auto',
  }),
  ...(shrink && {
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      '&:has(.MuiInputBase-input:focus)': {
        width: '100%',
      },
    },
  }),
}))

const SearchIconWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'shrink',
})(({ theme, shrink }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(shrink && {
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem',
    },
  }),
}))

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== 'shrink',
})(({ theme, shrink }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    backgroundColor: 'transparent',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    ...(shrink && {
      [theme.breakpoints.down('sm')]: {
        opacity: 0,
        width: 0,
        '&:focus': {
          opacity: 1,
          width: '100%',
        },
      },
    }),
  },
  width: '100%',
}))

/**
 *
 * @param {string} uniqueId unique id for search bar
 * @param {string} value search value
 * @param {function} handleChange search change handler
 * @param {JSX.Element} searchResult search results to display
 * @param {boolean} shrink shrink search bar to icon on mobile
 * @returns {JSX.Element}
 */
export default function SearchBar({ uniqueId, value, handleChange, searchResult, shrink }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Search shrink={shrink} {...(uniqueId && { id: uniqueId })}>
        <SearchIconWrapper shrink={shrink}>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          shrink={shrink}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={handleChange}
          onKeyUp={(e) => setAnchorEl(e.currentTarget)}
        />
      </Search>
      {searchResult && (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          disableAutoFocus
          disableEnforceFocus
        >
          {searchResult}
        </Popover>
      )}
    </>
  )
}
