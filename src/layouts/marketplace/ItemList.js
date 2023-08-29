import { useState } from 'react'
import { Menu, MenuItem, Stack, Typography, styled } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchBar from '@/components/SearchBar'
import InputBase from '@/components/InputBase'
import PaginationButtons from '@/components/Pagination'

const InputBaseStyled = styled(InputBase)(() => ({
  maxWidth: '4rem',
}))

const ExpandMoreIconStyled = styled(ExpandMoreIcon)(() => ({
  alignSelf: 'center',
  transition: 'transform 0.3s',
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.2)',
  },
}))

const filterOptionsList = [
  'Recently listed',
  'Price (Lowest to highest)',
  'Price (Highest to lowest)',
  'Newest',
  'Oldest',
]

const ListGridStyle = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(205px, 1fr))',
  columnGap: '2.5rem',
  rowGap: '2rem',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
    columnGap: '1rem',
    rowGap: '1rem',
  },
}))

const PaginationButtonsStyled = styled(PaginationButtons)(() => ({
  alignSelf: 'center',
}))

export default function ItemList({ children }) {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [filterOption, setFilterOption] = useState(filterOptionsList[0]) // default: 'Recently listed'

  const handleFilterOptions = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseFilterOptions = () => {
    setAnchorElNav(null)
  }

  const hanldeFilterOptionChoose = (option) => {
    setFilterOption(option)
    setAnchorElNav(null)
  }

  return (
    <>
      <Stack
        gap={{ xs: 1, sm: 3 }}
        rowGap={1}
        flexWrap="wrap"
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        justifyContent="flex-start"
      >
        <SearchBar />
        <Stack direction="row" gap={1.5} alignItems="center">
          <Typography variant="body1">Price range</Typography>
          <InputBaseStyled type="number" />
          <InputBaseStyled type="number" />
        </Stack>
        <Stack direction="row" gap={0.5} alignItems="center">
          <Typography variant="body1">{filterOption}</Typography>
          <ExpandMoreIconStyled fontSize="large" onClick={handleFilterOptions} />
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseFilterOptions}
          >
            {filterOptionsList.map((option) => (
              <MenuItem key={option} onClick={() => hanldeFilterOptionChoose(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>

      <ListGridStyle>{children}</ListGridStyle>

      <PaginationButtonsStyled />
    </>
  )
}
