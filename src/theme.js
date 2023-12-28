import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: `Roboto, sans-serif`,
    body: `Roboto, sans-serif`,
  },
  title: 'Fone AI',
  logo: {
    light: '/images/logo.png',
    dark: '/images/logo.png',
  },
  favicon: `/favicon.ico`,
  colors: {
    // primary: {
    //   50: '#fdf5f9',
    //   100: '#f8d9e7',
    //   200: '#f3b9d3',
    //   300: '#eb8db8',
    //   400: '#e56ba2',
    //   500: '#dc3882',
    //   600: '#c4246c',
    //   700: '#a01d58',
    //   800: '#7d1745',
    //   900: '#5d1133',
    // },
    primary: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3182CE',
      600: '#2B6CB0',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
    tertiary: {
      100: '#C6F6D5',
      200: '#9AE6B4',
      300: '#68D391',
      400: '#48BB78',
      500: '#38A169',
      600: '#2F855A',
      700: '#276749',
      800: '#22543D',
      900: '#1C4532',
    },
  },

  // components: {
  //   Button,
  // },
  styles: {
    global: props => ({
      body: {
        fontSize: ['sm', 'md', 'lg'],
        bg: mode('portalBg', 'portalBgDark')(props),
      },
    }),
  },
});

export default theme;
