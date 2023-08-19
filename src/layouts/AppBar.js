import { useState } from 'react'
import { useRouter } from 'next/router'
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
  styled,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import EthereumIcon from '@/components/EthereumIcon'

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
}))

const pages = [['Home', '/']]

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const router = useRouter()

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

  return (
    <AppBarStyled
      position="static"
      sx={{
        '.MuiContainer-root': {
          padding: '0 max(0.1em, calc((100% - clamp(300px, 95%, 1200px)) / 2))',
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            <EthereumIcon />
            {pages.map(([page, location]) => (
              <Button
                key={page}
                onClick={() => handleClickMenu(location)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textDecoration: router.pathname === location ? 'underline' : 'none',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBarStyled>
  )
}
export default ResponsiveAppBar
