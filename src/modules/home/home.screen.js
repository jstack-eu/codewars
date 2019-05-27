import React from 'react';
import styled from 'styled-components';
import codeWarsLogoSrc from '../../shared/resources/images/code-wars-logo-white.svg';
import {systemProps} from '@eu.jstack/theme-utils';
import {PrimaryButton, SecondaryButton} from '@eu.jstack/react-button';
import {withRouter} from 'react-router-dom';

const HomeScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Logo = styled.img`
    ${systemProps.common}
`;

const Introduction = styled.div`
    text-align: center;
    width: 40%;
    ${systemProps.common}
`;

const Spacer = styled.div`
    ${systemProps.common};
`;

const HomeScreen = ({history}) => {
    return (
        <HomeScreenContainer>
            <Logo mb={5} src={codeWarsLogoSrc} height={50}/>
            <Introduction mb={6} color='greys.2'>
                Code Wars is a sandbox game in which you will write code to take control of the player
            </Introduction>
            <PrimaryButton onClick={() => history.push('/game')} bg='baseOrange'>Join existing game</PrimaryButton>
            <Spacer mt={5}/>
            <SecondaryButton color='baseOrange'>Create new game</SecondaryButton>
        </HomeScreenContainer>
    )
};

export default withRouter(HomeScreen);
