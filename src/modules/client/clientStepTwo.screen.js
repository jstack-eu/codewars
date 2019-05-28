import React, {useContext} from 'react';
import styled from 'styled-components';
import {systemProps} from '@eu.jstack/theme-utils';
import {PrimaryButton} from '@eu.jstack/react-button';
import {observer} from 'mobx-react-lite';
import GameFormStore from '../game/gameForm.store';
import {withRouter} from 'react-router-dom';

const ClientScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const InnerContainer = styled.div`
    justify-content: flex-start;
`;

const BackContainer = styled.div`
    cursor: pointer;
    ${systemProps.common};
    
    &:hover {
        opacity: 0.8;
    }
`;

const BackIcon = styled.i`
    ${systemProps.common};
`;

const Heading = styled.div`
    ${systemProps.common};
    ${systemProps.typography};
`;

const InputButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Input = styled.input`
    border: none;
    border-radius: 2px 0 0 2px;
    background-color: transparent;
    ${systemProps.common};
    ${systemProps.typography};
    ${systemProps.layout};
`;

const InputButton = styled(PrimaryButton)`
    border-radius: 0 2px 2px 0;
`;

const ClientStepTwoScreen = observer(({history}) => {
    const gameFormStore = useContext(GameFormStore);

    return (
        <ClientScreenContainer>
            <InnerContainer>
                <BackContainer onClick={history.goBack} mb={3} color='greys.0'><BackIcon mr={2} className="fas fa-arrow-left"/>Go back</BackContainer>
                <Heading mb={5} fontSize={3} fontWeight='600' color='greys.4'>What is the ip address of the server?</Heading>
                <InputButtonContainer>
                    <Input
                        minWidth='250px'
                        value={gameFormStore.ip}
                        onChange={(e) => gameFormStore.setIp(e.target.value)}
                        fontSize={2}
                        bg='greys.0'
                        color='white'
                        p={2}
                    />
                    <InputButton disabled={!gameFormStore.ip} onClick={() => history.push('/game')}>Join</InputButton>
                </InputButtonContainer>
            </InnerContainer>
        </ClientScreenContainer>
    )
});

export default withRouter(ClientStepTwoScreen);
