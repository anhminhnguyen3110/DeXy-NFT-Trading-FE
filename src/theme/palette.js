import { alpha } from '@mui/material/styles'

// SETUP COLORS
const PRIMARY = {
  lighter: '#C8FACD',
  light: '#6CC6C4',
  main: '#DAFDBA',
  dark: '#9AEBA3',
  darker: '#45C4B0',
}
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#2D9CDB',
  dark: '#1939B7',
  darker: '#091A7A',
}
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#2D9CDB',
  dark: '#0C53B7',
  darker: '#04297A',
}
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#9AEBA3',
  dark: '#229A16',
  darker: '#08660D',
}
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#F2C94C',
  dark: '#B78103',
  darker: '#7A4F01',
}
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#EB5757',
  dark: '#B72136',
  darker: '#7A0C2E',
}

const GREY = {
  0: '#FFFFFF',
  100: '#FEFEFE',
  200: '#F5F9FE',
  300: '#DFE3E8',
  400: '#919CAC',
  500: '#586374',
  600: '#637381',
  700: '#454F5B',
  800: '#012030',
  900: '#1D222A',
  500_8: alpha('#586374', 0.08),
  500_12: alpha('#586374', 0.12),
  500_16: alpha('#586374', 0.16),
  500_24: alpha('#586374', 0.24),
  500_32: alpha('#586374', 0.32),
  500_48: alpha('#586374', 0.48),
  500_56: alpha('#586374', 0.56),
  500_80: alpha('#586374', 0.8),
}

const COMMON = {
  common: { black: '#1D222A', white: '#FEFEFE' },
  primary: { ...PRIMARY, contrastText: '#1D222A' },
  secondary: { ...SECONDARY, contrastText: '#FEFEFE' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  divider: GREY[500],
  action: {
    active: PRIMARY.main,
    hover: PRIMARY.main,
    selected: PRIMARY.main,
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: PRIMARY.main,
    hoverOpacity: 0.8,
    disabledOpacity: 0.5,
  },
}

const palette = {
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: GREY[100], secondary: GREY[200], disabled: GREY[400] },
    background: { paper: GREY[500], default: GREY[900], neutral: GREY[800] },
    action: { ...COMMON.action },
  },
}

export default palette
