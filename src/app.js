import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter,HashRouter} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core/styles";

import AWNDarkTheme from './theme/SquadOpsDark';
import AppRouter from './app.routes';

class App extends Component {

    render() {
        return (
            <HashRouter>
                <MuiThemeProvider theme={AWNDarkTheme}>
                    <AppRouter/>
                </MuiThemeProvider>
            </HashRouter>
        )
    }
}

ReactDOM.render((<App/>), document.getElementById('app'));
