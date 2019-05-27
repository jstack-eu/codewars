import React from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import ServerScreen from './modules/server/server.screen';
import ClientScreen from './modules/client/client.screen';
import HomeScreen from './modules/home/home.screen';
import GameScreen from './modules/game/game.screen';
import {theme} from './shared/styles/theme';
import Header from './modules/header/header';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Titillium Web', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${props => props.theme.colors.backgroundColor};
    }
`;

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <BrowserRouter>
                    <React.Fragment>
                        <Header/>
                        <GlobalStyles/>
                        <Switch>
                            <Route path="/home" component={HomeScreen}/>
                            <Route path="/server" component={ServerScreen}/>
                            <Route path="/client" component={ClientScreen}/>
                            <Route path="/game" component={GameScreen}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </React.Fragment>
                </BrowserRouter>
            </React.Fragment>
        </ThemeProvider>
    );
};

export default App;
