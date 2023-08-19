import { useMemo } from 'react'
// @mui
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
//
import palette from './palette'
import typography from './typography'
import breakpoints from './breakpoints'

export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette: palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 10 },
      direction: 'ltr',
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'unset',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundImage: 'unset',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            contained: {
              backgroundColor: palette.dark.grey[100],
              color: palette.dark.grey[800],
              '&:hover': {
                backgroundColor: palette.dark.grey[100],
                opacity: 0.8,
              },
            },
          },
        },
      },
    }),
    []
  )

  const theme = createTheme(themeOptions)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
