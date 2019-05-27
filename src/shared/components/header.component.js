import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import {lighten} from 'polished';
import {inject, observer} from 'mobx-react';
import withRouter from 'react-router-dom/es/withRouter';

const StyledHeader = styled.div`
    background: ${props => props.theme.palette.blackFaded};
    color: ${props => props.theme.palette.whiteFaded};
    height: 48px;
    line-height: 48px;
    display: flex;
`;

const ActiveHeaderItem = css`
    background: ${props => lighten(0.1, props.theme.palette.blackFaded)};
    border-bottom: 4px solid ${props => props.theme.palette.orangeHard};
`;

const StyledHeaderItem = styled.div`
    padding: 0 ${props => props.theme.margins.sizeNormal} 0 ${props => props.theme.margins.sizeNormal};
    border-bottom: 4px solid ${props => props.theme.palette.blackFaded}
    
    &.active {
        ${ActiveHeaderItem}
    }
    
    &:hover {
        cursor: pointer;
        ${ActiveHeaderItem}
    }
`;

const StyledHeaderFiller = styled.div`
    border-bottom: 4px solid ${props => props.theme.palette.blackFaded}
`;

class Header extends Component {

    constructor (props) {
        super(props);
    }

    navigate = (route) => () => {
        this.props.history.push(`/${route}`);
    };

    render() {
        return (
            <StyledHeader>
                <StyledHeaderItem onClick={this.navigate('home')}>Home</StyledHeaderItem>
                <StyledHeaderItem onClick={this.navigate('client')}>Client</StyledHeaderItem>
                <StyledHeaderItem onClick={this.navigate('server')}>Server</StyledHeaderItem>
                <StyledHeaderFiller></StyledHeaderFiller>
            </StyledHeader>
        );
    }
}

export default withRouter(Header);