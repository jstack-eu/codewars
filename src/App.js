import React, { Component } from 'react';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import './App.css';
import {Theme} from './shared/styles/theme.styles';
import Header from './shared/components/header.component';
import ServerScreen from './modules/server/server.screen';
import ClientScreen from './modules/client/client.screen';
import HomeScreen from './modules/home/home.screen';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;     
        font-family: "Lato", sans-serif;
        background: ${Theme.palette.whiteFaded};
        color: ${Theme.palette.blackFaded};             
    }
    
    h1, h2, h3, h4, h5, h6, h7, h8 {
        font-family: "Rubik", sans-serif;
        margin: ${Theme.margins.sizeVerySmall} auto ${Theme.margins.sizeVerySmall} auto;
    }
`;

const StyledContent = styled.div`
    padding: ${Theme.margins.sizeNormal} ${Theme.margins.sizeNormal} 0 ${Theme.margins.sizeNormal} 
    height: 100%;
`;

class App extends Component {
  render() {
    return (
        <ThemeProvider theme={Theme}>
            <React.Fragment>
                <BrowserRouter>
                    <React.Fragment>
                        <GlobalStyles />
                        <Header />
                        <StyledContent>
                            <Switch>
                                <Route path="/home" component={ HomeScreen } />
                                <Route path="/server" component={ ServerScreen } />
                                <Route path="/client" component={ ClientScreen } />
                                <Redirect to="/home" />
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
