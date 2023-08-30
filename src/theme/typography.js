/**
 * Author: Kien Quoc Mai
 * Created date: 16/08/2023
 * Last modified Date: 29/08/2023
 */
import { pxToRem, responsiveFontSizes } from '../utils/getFontValue'
import palette from './palette'

// ----------------------------------------------------------------------

const FONT_PRIMARY = 'Poppins, sans-serif'
const FONT_SECONDARY = 'Lora, serif'

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  color: palette.dark.text.primary,
  h1: {
    color: palette.dark.text.secondary,
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    letterSpacing: 2,
    ...responsiveFontSizes({ sm: 32, md: 40, lg: 40 }),
  },
  h2: {
    color: palette.dark.text.secondary,
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(26),
    ...responsiveFontSizes({ sm: 26, md: 26, lg: 32 }),
  },
  h3: {
    color: palette.dark.text.secondary,
    fontFamily: FONT_SECONDARY,
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(26),
    ...responsiveFontSizes({ sm: 26, md: 26, lg: 32 }),
  },
  h4: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 20, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 300,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    fontStyle: 'italic',
    color: palette.dark.primary.main,
  },
  subtitle2: {
    fontWeight: 300,
    lineHeight: 22 / 14,
    fontSize: pxToRem(13),
    fontStyle: 'italic',
    color: palette.dark.primary.main,
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    color: palette.dark.grey[800],
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(16),
    textTransform: 'capitalize',
  },
}

export default typography
