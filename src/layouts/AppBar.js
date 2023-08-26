import { useState } from 'react'
import { useRouter } from 'next/router'
import useResponsive from '@/hooks/useResponsive'
import Link from 'next/link'
import {
  Container,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Paper,
  Avatar,
  styled,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import EthereumIcon from '@/components/EthereumIcon'
import SearchBar from '@/components/SearchBar'
import WalletConnect from './WalletConnect'

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  width: '100vw',
}))

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Teko, sans-serif',
  color: theme.palette.primary.main,
  fontSize: '2.75rem',
  fontWeight: 600,
}))

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  minHeight: '4.125rem',
  gap: '2.8rem',
  [theme.breakpoints.down('md')]: {
    gap: '1.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    '&:has(.MuiInputBase-input:focus)': {
      '& #logo-link, & #nav-menu-button': {
        display: 'none',
      },
    },
  },
}))

const NavMenuContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '0.75rem',
  [theme.breakpoints.down('sm')]: {
    gap: '0.1rem',
  },
}))

const NavButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  top: '-0.25rem',
  display: 'block',
  fontSize: '1.25rem',
  fontWeight: 400,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: 'unset',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: '0.25rem',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '100px',
    transition: 'width 0.15s ease-in-out',
  },
  '&:hover::before': {
    width: 'max(20%, 1.75rem)',
  },
  '&.nav-button-active::before': {
    width: 'calc(100% - 16px)',
  },
}))

const SearchResultContainer = styled(Paper)(({ theme }) => ({
  width: '90vw',
  [theme.breakpoints.up('sm')]: {
    width: 'clamp(14rem, 20vw, 18rem)',
  },
}))

const pages = [
  ['Marketplace', '/'],
  ['Create', '/create-dexy-item'],
]
const accountMenu = [
  ['Create wallet', 'https://metamask.io/'],
  ['Account', '/account'],
]

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const router = useRouter()
  const isDesktop = useResponsive('up', 'md')
  const [searchValue, setSearchValue] = useState('')
  const [openWalletConnect, setOpenWalletConnect] = useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleClickMenu = (location) => {
    handleCloseNavMenu()
    router.push(`${location.toLowerCase()}`)
  }

  const handleChangeSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const handleOpenWalletConnect = () => {
    handleCloseNavMenu()
    setOpenWalletConnect(true)
  }

  const renderSearchResult = () => {
    const searchResult = [
      ['Space doge 1', 'abcxyz', '/space-doge'],
      ['Space doge 2', 'abcxyz', '/space-doge'],
      ['Space doge 3', 'abcxyz', '/space-doge'],
    ]
    return (
      <SearchResultContainer>
        {searchResult.map(([name, owner, location]) => (
          <MenuItem key={`${name}-${owner}`} onClick={() => handleClickMenu(location)}>
            <Avatar src="/space-doge-sm.jpeg" variant="rounded" />
            <Stack gap={0.2} marginLeft={1}>
              <Typography variant="h4" style={{ fontSize: '1rem' }}>
                {name}
              </Typography>
              <Typography variant="subtitle2">{owner}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </SearchResultContainer>
    )
  }

  return (
    <AppBarStyled position="static">
      <Container maxWidth="xl">
        <ToolbarStyled disableGutters variant="dense">
          <Link href="/" id="logo-link">
            <Logo>DeXy</Logo>
          </Link>
          {isDesktop && (
            <Stack direction="row" gap={1} alignItems="center">
              <EthereumIcon />
              <Typography fontSize="1.25rem">Etherium</Typography>
            </Stack>
          )}
          <NavMenuContainer sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <SearchBar
              uniqueId="app-search-bar-sm"
              value={searchValue}
              handleChange={handleChangeSearch}
              searchResult={renderSearchResult()}
            />
            <IconButton
              id="nav-menu-button"
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar-sm"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar-sm"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {pages.map(([page, location]) => (
                <MenuItem key={page} onClick={() => handleClickMenu(location)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleOpenWalletConnect}>Connect wallet</MenuItem>
              {accountMenu.map(([page, location]) => (
                <MenuItem key={`account-menu-${page}`} onClick={() => handleClickMenu(location)}>
                  {page}
                </MenuItem>
              ))}
              <MenuItem onClick={() => {}}>Log out</MenuItem>
            </Menu>
          </NavMenuContainer>
          <NavMenuContainer sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <div
              style={{
                width: 'max(25%, 15rem)',
                marginRight: 'min(1rem, 0.5vw)',
                flexShrink: 8,
              }}
            >
              <SearchBar
                uniqueId="app-search-bar"
                value={searchValue}
                handleChange={handleChangeSearch}
                searchResult={renderSearchResult()}
              />
            </div>
            {pages.map(([page, location]) => (
              <NavButton
                key={page}
                onClick={() => handleClickMenu(location)}
                className={router.pathname === location ? 'nav-button-active' : 'nav-button'}
              >
                {page}
              </NavButton>
            ))}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ marginLeft: '1rem' }}
            >
              <AccountBalanceWalletRoundedIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <MenuItem onClick={handleOpenWalletConnect}>Connect wallet</MenuItem>
              {accountMenu.map(([page, location]) => (
                <MenuItem key={`account-menu-${page}`} onClick={() => handleClickMenu(location)}>
                  {page}
                </MenuItem>
              ))}
              <MenuItem onClick={() => {}}>Log out</MenuItem>
            </Menu>
          </NavMenuContainer>
        </ToolbarStyled>
      </Container>
      <WalletConnect open={openWalletConnect} handleClose={() => setOpenWalletConnect(false)} />
    </AppBarStyled>
  )
}
export default ResponsiveAppBar
