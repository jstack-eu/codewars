import React from 'react';
import styled from 'styled-components';
import {systemProps} from '@eu.jstack/theme-utils';
import codeWarsLogoSrc from '../../shared/resources/images/code-wars-logo-white.svg';
import {withRouter} from 'react-router-dom';

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    ${systemProps.common}
`;

const Title = styled.div`
    ${systemProps.common}
    ${systemProps.typography}
`;

const excludedPaths = [
    '/home'
];

const Header = (props) => {
    const {pathname} = props.location;
    console.log('path name ', pathname);

    if (excludedPaths.includes(pathname)) {
        return null;
    }

    return (
        <HeaderContainer px={5} py={5}>
            <img src={codeWarsLogoSrc} height={30} alt='logo'/>
            <Title fontWeight='600' fontSize={4} px={4} color='white'>Game</Title>
        </HeaderContainer>
    )
};

export default withRouter(Header);
