import { useState } from 'react'
import { InputBase, Popover, alpha, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  maxHeight: '2.5rem',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  transition: theme.transitions.create('width'),
  width: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    '&:has(.MuiInputBase-input:focus)': {
      width: '100%',
      border: `1px solid ${theme.palette.grey[400]}`,
    },
  },
  [theme.breakpoints.up('sm')]: {
    border: `1px solid ${theme.palette.grey[400]}`,
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: '0.5rem',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    backgroundColor: 'transparent',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      opacity: 0,
      width: 0,
      '&:focus': {
        opacity: 1,
        width: '100%',
      },
    },
  },
  width: '100%',
}))

export default function SearchBar({ uniqueId, value, handleChange, searchResult }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Search {...(uniqueId && { id: uniqueId })}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          autoFocus
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={value}
          onChange={handleChange}
          onKeyUp={(e) => setAnchorEl(e.currentTarget)}
        />
      </Search>
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
        container={() => (uniqueId ? document.getElementById(uniqueId) : document.body)}
      >
        {searchResult}
      </Popover>
    </>
  )
}
