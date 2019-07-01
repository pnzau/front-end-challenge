import { history } from 'helpers';
import { CustomThemeProvider } from 'modules/shared/components/themeContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';
import store from 'store';

import * as serviceWorker from './serviceWorker';

// import { ThemeProvider } from 'styled-components';

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <Router history={history}>
            <CustomThemeProvider>
                <Routes />
            </CustomThemeProvider>
        </Router>
    </Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
