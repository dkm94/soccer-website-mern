const muiTheme = {
	components: {
		MuiContainer: { styleOverrides: { root: { fontSize: '0.8rem' } } },
		MuiButton: {
			styleOverrides: {
				root: {
					// fontSize: '3rem',
				},
			},
		},
		// MuiInputLabel: {
		// 	styleOverrides: {

		// 	},
		// },
		// MuiOutlinedInput: {
		// 	styleOverrides: {
		// 		root: {
		// 			// fontSize: '0.9rem'
		// 		},
		// 	},
		// },
	},
	palette: {
		primary: {
			main: '#ad0606',
			lighter: '#e8889a',
			contrastText: '#FDFFFC',
		},
		secondary: { main: '#998da0' },
		black: {
			main: '#2c2f35',
			light: '#3e4249',
			dark: '#000000',
			contrastText: '#FDFFFC',
		},
		white: { main: '#FDFFFC' },
		grey: {
			main: ' #a9a9a9',
			light: ' #cccccc',
			lighter: '#eae8e8',
			dark: '#706d6d',
			contrastText: ' #2c2f35',
		},
		green: {
			main: '#0c893c',
			light: '#73bc8f',
			contrastText: '#FDFFFC',
		},
		blue: {
			main: '#1976D2',
			light: '#88bae8',
		},
	},
	typography: {
		fontFamily: 'system-ui, sans-serif',
		fontWeight: '400',
		h1: {
			fontFamily: ' Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif',
			fontWeight: 'normal',
		},
		h2: {
			fontSize: '1rem',
			fontWeight: '400', 
		},
		h6: { fontWeight: 600 },
		body1: { fontSize: '0.8rem' },
		body2: { fontSize: '0.75rem' },
	},
};

export default muiTheme;