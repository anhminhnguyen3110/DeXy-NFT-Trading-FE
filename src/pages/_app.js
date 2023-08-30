/**
 * Author: Kien Quoc Mai
 * Created date: 02/08/2023
 * Last modified Date: 29/08/2023
 */
import Head from 'next/head'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { IconButton, styled } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { SnackbarProvider, closeSnackbar, MaterialDesignContent } from 'notistack'
import Layout from '../layouts'
import ThemeProvider from '../theme'
import '@/styles/globals.css'

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

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <ThemeProvider>
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
        </ThemeProvider>
      </LocalizationProvider>
    </>
  )
}
