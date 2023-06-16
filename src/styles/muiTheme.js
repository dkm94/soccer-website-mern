export const theme = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          fontFamily: `'Nunito', sans-serif`,
          fontSize: '0.8rem'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // fontSize: '0.9rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // fontSize: '0.9rem'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#ad0606',
      lighter: '#e8889a',
      contrastText: '#FDFFFC'
    },
    secondary: {
      main: '#998da0'
    },
    black: {
      main: '#2c2f35',
      light: '#3e4249',
      dark: '#000000',
      contrastText: '#FDFFFC'
    },
    white: {
      main: '#FDFFFC'
    },
    grey: {
      main: ' #a9a9a9',
      light: ' #cccccc',
      lighter: '#eae8e8',
      dark: '#706d6d',
      contrastText: ' #2c2f35'
    },
    green: {
      main: '#0c893c',
      light: '#73bc8f',
      contrastText: '#FDFFFC'
    },
    blue: {
      main: '#1976D2',
      light: '#88bae8'
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
