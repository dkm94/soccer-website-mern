export const theme = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          fontFamily: `'Nunito', sans-serif`,
          fontSize: 14
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#ad0606',
      contrastText: '#FDFFFC'
    },
    secondary: {
      main: '#998da0'
    },
    black: {
      main: '#2c2f35',
      light: '#3e4249',
      contrastText: '#FDFFFC'
    },
    white: {
      main: '#FDFFFC'
    },
    grey: {
      main: ' #a9a9a9',
      contrastText: ' #2c2f35'
    }
  },
  typography: {
    fontFamily: `'Nunito', sans-serif`,
    h2: {
      fontSize: '1rem'
    },
    h6: {
      fontWeight: 600
    },
    body1: {
      fontSize: '0.8rem'
    },
    body2: {
      fontSize: '0.75rem'
    }
  }
};
