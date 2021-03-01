export const colors = {
  blue: '#292141',
  maroon: '#A63429',
  redOrange: '#F25922',
  red: '#D93829',
  peach: '#F2C094',
  smoke: '#f3f3f3',
  lightGrey: '#E5E5E5',
  grey: '#AAAAAA',
  darkGrey: '#707070',
  charcoal: '#333',
};

export const theme = {
  main: colors.blue,
  main2: colors.maroon,
  accent: colors.redOrange,
  fg: colors.charcoal,
  fg2: colors.darkGrey,
  bg: colors.smoke,
  error: 'crimson',
};

export const screenSize = {
  xs: '450px',
  sm: '600px',
  md: '960px',
  lg: '1366px',
  xl: '1920px',
};

export const device = {
  phone: `(max-width: ${screenSize.xs})`,
  narrow: `(max-width: ${screenSize.sm})`,
  tablet: `(max-width: ${screenSize.md})`,
  desktop: `(max-width: ${screenSize.lg})`,
  fullhd: `(max-width: ${screenSize.xl})`,
  widescreen: `(min-width: ${screenSize.xl})`,
};

export type ScreenSize = keyof typeof screenSize;
export type DeviceSize = keyof typeof device;
