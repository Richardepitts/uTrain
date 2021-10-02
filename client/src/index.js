import React from "react";
import { hydrate, render } from "react-dom";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store'
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/styles";
import theme from '../src/components/theme/Theme'
import '../src/assets/fonts/whatever.ttf'

render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Provider store={store}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Provider>
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root')
);
