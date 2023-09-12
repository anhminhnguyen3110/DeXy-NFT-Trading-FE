/**
 * Author: Kien Quoc Mai
 * Created date: 02/08/2023
 * Last modified Date: 12/09/2023
 */
import Head from 'next/head'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { IconButton, styled, useTheme } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { SnackbarProvider, closeSnackbar, MaterialDesignContent } from 'notistack'
import Layout from '../layouts'
import ThemeProvider from '../theme'
import '@/styles/globals.css'

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

const chains = [mainnet]
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function Web3ModalComponent() {
  const theme = useTheme()

  return (
    <Web3Modal
      projectId={projectId}
      ethereumClient={ethereumClient}
      themeVariables={{
        '--w3m-font-family': theme.typography.fontFamily,
        '--w3m-accent-color': theme.palette.primary.darker,
        '--w3m-background-color': theme.palette.background.paper,
        '--w3m-color-bg-1': theme.palette.grey[200],
      }}
    />
  )
}

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
          {/* <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
          <Web3ModalComponent />
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}
