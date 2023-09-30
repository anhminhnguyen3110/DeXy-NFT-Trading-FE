/**
 * Author: Kien Quoc Mai
 * Created date: 02/08/2023
 * Last modified Date: 29/09/2023
 */
import Head from 'next/head'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, localhost } from 'wagmi/chains'
import { IconButton, styled, useTheme } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { SnackbarProvider, closeSnackbar, MaterialDesignContent } from 'notistack'
import Layout from '../layouts'
import ThemeProvider from '../theme'
import '@/styles/globals.css'
import typography from '@/theme/typography'
import palette from '@/theme/palette'

// Styled component for the content of the success and error snackbars
const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.grey[100],
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.grey[100],
  },
}))

const chains = [mainnet, localhost]
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    themeMode: 'light',
    '--w3m-font-family': typography.fontFamily,
    '--w3m-accent': palette.dark.primary.darker,
    '--w3m-color-mix': palette.dark.background.paper,
    '--w3m-color-mix-strength': 30,
  },
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <ThemeProvider>
          <WagmiConfig config={wagmiConfig}>
            <SnackbarProvider
              autoHideDuration={3000}
              Components={{
                success: StyledMaterialDesignContent,
                error: StyledMaterialDesignContent,
              }}
              action={(snackbarId) => (
                <IconButton onClick={() => closeSnackbar(snackbarId)} size="small">
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              )}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SnackbarProvider>
          </WagmiConfig>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}
