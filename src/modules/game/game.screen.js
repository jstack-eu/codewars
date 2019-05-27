import React, {useContext, useEffect, useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import GameStore from './game.store';
import {observer} from 'mobx-react-lite';
import {drawPlayer, drawTile} from './gameDraw.service';

const electron = window.require('electron').remote;

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
`;

const CanvasContainer = styled.div`
`;

const Canvas = styled.canvas`
    width: 800px;
    height: 480px;
`;

const GameScreen = observer(() => {
    const gameStore = useContext(GameStore);
    const [node, setRef] = useState(null);

    const drawMap = () => {
        gameStore.map.map((row, rowIndex) => {
            row.map((col, colIndex) => {
                drawTile({context: node.getContext('2d'), x: colIndex * 16, y: rowIndex * 16, walkable: col.walkable});
            });
        });
    };

    const drawPlayers = () => {
        gameStore.players.map(player => drawPlayer({
            context: node.getContext('2d'),
            x: player.x,
            y: player.y,
            color: player.color
        }));
    };

    useEffect(drawMap, [gameStore.map]);
    useEffect(drawPlayers, [gameStore.players]);

    useEffect(
        () => {
            if (node) {
                // your Hook now has a reference to the ref element.
                // scale for retina screens
                node.getContext('2d').scale(2, 2);
            }
        },
        [node],
    );

    return (
        <React.Fragment>
            <GlobalStyle/>
            <CanvasContainer>
                <Canvas
                    height={960}
                    width={1600}
                    ref={setRef}
                    onClick={e => {
                    }}
                />
            </CanvasContainer>
        </React.Fragment>
    )
});

export default GameScreen;
