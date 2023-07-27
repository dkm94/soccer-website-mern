import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Experimental_CssVarsProvider as CssVarsProvider,
	experimental_extendTheme as extendTheme } from '@mui/material';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import App from 'router/App';
import ModalComponent from 'components/Modal/ModalComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
import cssVars from 'styles/customVars';
import muiTheme from 'styles/muiTheme';
const THEME = createMuiTheme(muiTheme);
const theme = extendTheme(cssVars);

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CssVarsProvider theme={theme}>
				<MuiThemeProvider theme={THEME}>
					<Router>
						<App />
					</Router>
					<div className="clipping-container">
						<ModalComponent />
					</div>
				</MuiThemeProvider>
			</CssVarsProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
