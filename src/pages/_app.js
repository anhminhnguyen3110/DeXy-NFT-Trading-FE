import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Layout from './layouts'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocalizationProvider>
  )
}
