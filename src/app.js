import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {BrowserRouter,HashRouter} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core/styles";

// Persistent Store Setup
// import {PersistGate} from 'redux-persist/integration/react';
// import configureStore from './app.persistant-store';
// const { persistor, store } = configureStore();

import MainContainer from './layouts/MainContainer'
import AWNDarkTheme from './theme/AWNDark';
import AppRouter from './app.routes';

import store from './app.store';


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                {/*<PersistGate loading={null} persistor={persistor}>*/}
                    <HashRouter>
                        <MuiThemeProvider theme={AWNDarkTheme}>
                            <AppRouter/>
                        </MuiThemeProvider>
                    </HashRouter>
                {/*</PersistGate>*/}
            </Provider>
        )
    }
}

ReactDOM.render((<App/>), document.getElementById('app'));
// export default connect(null, {})(App);
