// @mui
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
// component
import ResponsiveAppBar from './AppBar'
import Footer from './Footer'
const RootStyle = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}))

const MainStyle = styled('main')(({ theme }) => ({
  //   backgroundColor: homepage ? theme.palette.primary.main : theme.palette.grey[400],
  flexGrow: 1,
  marginBottom: 'auto',
  [theme.breakpoints.up('lg')]: {
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}))

export default function Layout({ children }) {
  return (
    <RootStyle>
      <ResponsiveAppBar />
      <MainStyle>{children}</MainStyle>
      <Footer />
    </RootStyle>
  )
}
