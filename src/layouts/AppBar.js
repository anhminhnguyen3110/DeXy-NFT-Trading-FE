/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 02/08/2023
 * Last modified Date: 12/09/2023
 */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useResponsive from '@/hooks/useResponsive'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'
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
  Backdrop,
  CircularProgress,
  styled,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import EthereumIcon from '@/components/EthereumIcon'
import SearchBar from '@/components/SearchBar'
import ShoppingCart from './ShoppingCart'

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
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
      '& .hide-on-search-focus': {
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
  ['Marketplace', '/marketplace'],
  ['Create', '/create'],
]
const accountMenuNotLogin = [['Create wallet', 'https://metamask.io/']]

const accountMenuLogin = [['Account', '/account/']]
/**
 * Sitewide app bar
 * @returns {JSX.Element}
 */
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const router = useRouter()
  const isDesktop = useResponsive('up', 'md')
  const { enqueueSnackbar } = useSnackbar()
  const [searchValue, setSearchValue] = useState('')
  const [openShoppingCart, setOpenShoppingCart] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const { open: openWalletConnect, close: closeWalletConnect } = useWeb3Modal()
  const { signMessageAsync } = useSignMessage({
    message: process.env.NEXT_PUBLIC_LOGIN_MESSAGE,
  })
  const { disconnect } = useDisconnect()
  const { address: userAddress, isConnected } = useAccount({
    async onConnect({ address, isReconnected }) {
      if (!isReconnected) {
        try {
          setLoginLoading(true)
          const message = await signMessageAsync()
          console.log(address, message)
        } catch {
          enqueueSnackbar('Login failed', { variant: 'error' })
          disconnect()
        } finally {
          setLoginLoading(false)
        }
      }
    },
  })

  useEffect(() => {
    if (isConnected) {
      closeWalletConnect()
    }
  }, [closeWalletConnect, isConnected, userAddress])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleClickMenu = (location) => {
    handleCloseNavMenu()
    if (location.endsWith('account/')) location = location + userAddress
    router.push(`${location}`)
  }

  const handleChangeSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const handleOpenWalletConnect = () => {
    handleCloseNavMenu()
    openWalletConnect()
  }

  const handleOpenShoppingCart = () => {
    handleCloseNavMenu()
    setOpenShoppingCart(true)
  }

  const handleLogout = () => {
    disconnect()
  }

  async function connectToMetamask() {
    // const address = '0x1aBA989D0703cE6CC651B6109d02b39a9651aE5d'
    // localStorage.setItem('userAddress', address)
    // setUserAddress(address)
  }

  const renderSearchResult = () => {
    const searchResult = [
      ['Space doge 1', 'abcxyz', '/item/1'],
      ['Space doge 2', 'abcxyz', '/item/2'],
      ['Space doge 3', 'abcxyz', '/item/3'],
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
          <Link href="/" className="hide-on-search-focus">
            <Logo>DeXy</Logo>
          </Link>
          {isDesktop && (
            <Stack direction="row" gap={1} alignItems="center">
              <EthereumIcon />
              <Typography fontSize="1.25rem">Ethereum</Typography>
            </Stack>
          )}

          {/* Mobile navigation menu */}
          <NavMenuContainer sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <SearchBar
              uniqueId="app-search-bar-sm"
              shrink
              value={searchValue}
              handleChange={handleChangeSearch}
              searchResult={renderSearchResult()}
            />
            {!isConnected ? null : (
              <IconButton
                className="hide-on-search-focus"
                size="large"
                aria-label="shopping cart"
                aria-controls="shopping-cart"
                aria-haspopup="true"
                onClick={handleOpenShoppingCart}
              >
                <ShoppingCartRoundedIcon />
              </IconButton>
            )}
            <IconButton
              className="hide-on-search-focus"
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
              <MenuItem onClick={connectToMetamask}>Metamask</MenuItem>
              <MenuItem onClick={handleOpenWalletConnect}>Connect wallet</MenuItem>
              {accountMenuNotLogin.map(([page, location]) => (
                <MenuItem key={`account-menu-${page}`} onClick={() => handleClickMenu(location)}>
                  {page}
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </NavMenuContainer>

          {/* Desktop navigation menu */}
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
                shrink
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
            {!isConnected ? null : (
              <IconButton
                className="hide-on-search-focus"
                size="large"
                aria-label="shopping cart"
                aria-controls="shopping-cart"
                aria-haspopup="true"
                onClick={handleOpenShoppingCart}
              >
                <ShoppingCartRoundedIcon />
              </IconButton>
            )}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <AccountBalanceWalletRoundedIcon />
            </IconButton>
            {!isConnected ? (
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
                <MenuItem onClick={connectToMetamask}>Metamask</MenuItem>
                <MenuItem onClick={handleOpenWalletConnect}>Connect wallet</MenuItem>
                {accountMenuNotLogin.map(([page, location]) => (
                  <MenuItem key={`account-menu-${page}`} onClick={() => handleClickMenu(location)}>
                    {page}
                  </MenuItem>
                ))}
              </Menu>
            ) : (
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
                {accountMenuLogin.map(([page, location]) => (
                  <MenuItem key={`account-menu-${page}`} onClick={() => handleClickMenu(location)}>
                    {page}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>Log out</MenuItem> {/* Moved inside the Menu */}
              </Menu>
            )}
          </NavMenuContainer>
        </ToolbarStyled>
      </Container>
      <ShoppingCart open={openShoppingCart} handleClose={() => setOpenShoppingCart(false)} />
      <Backdrop sx={{ zIndex: 9999 }} open={loginLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </AppBarStyled>
  )
}
export default ResponsiveAppBar
