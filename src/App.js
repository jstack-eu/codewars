import React, { Component } from 'react';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import ServerScreen from './modules/server/server.screen';
import ClientScreen from './modules/client/client.screen';
import HomeScreen from './modules/home/home.screen';
import GameScreen from './modules/game/game.screen';
import {theme} from './shared/styles/theme';
import {systemProps} from '@eu.jstack/theme-utils';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;     
        font-family: "Lato", sans-serif;
    }
`;

const StyledContent = styled.div`
    ${systemProps.common};
    height: 100%;
`;

class App extends Component {
  render() {
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <BrowserRouter>
                    <React.Fragment>
                        <GlobalStyles />
                        <StyledContent p={3}>
                            <Switch>
                                <Route path="/home" component={ HomeScreen } />
                                <Route path="/server" component={ ServerScreen } />
                                <Route path="/client" component={ ClientScreen } />
                                <Route path="/game" component={ GameScreen } />
                                <Redirect to="/game" />
                            </Switch>
                        </StyledContent>
                    </React.Fragment>
                </BrowserRouter>
            </React.Fragment>
        </ThemeProvider>
    );
  }
}

export default App;
