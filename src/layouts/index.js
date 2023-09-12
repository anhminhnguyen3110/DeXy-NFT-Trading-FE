/**
 * Author: Kien Quoc Mai, Duy Khoa Pham
 * Created date: 16/08/2023
 * Last modified Date: 12/09/2023
 */
import dynamic from 'next/dynamic'
// @mui
import { styled } from '@mui/material/styles'
import { Box, Container } from '@mui/material'
// component
import Footer from './Footer'
const ResponsiveAppBar = dynamic(() => import('./AppBar'), {
  ssr: false,
})

const RootStyle = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}))

const MainStyle = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  flexGrow: 1,
  marginBottom: 'auto',
  [theme.breakpoints.up('lg')]: {
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}))

/**
 * Sitewide layout
 * @param {JSX.Element} children page content
 * @returns {JSX.Element}
 */
export default function Layout({ children }) {
  return (
    <RootStyle>
      <ResponsiveAppBar />
      <MainStyle component="main" maxWidth="xl">
        {children}
      </MainStyle>
      <Footer />
    </RootStyle>
  )
}
