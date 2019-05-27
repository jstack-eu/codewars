import React, {useEffect, useState, useContext} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {drawCircle, drawCircleStroke, drawRectangle} from '../../shared/canvasDraw.helper';
import GameStore from './game.store';
import {observer} from 'mobx-react-lite';
import {drawTile} from './gameDraw.service';
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
  border: 1px solid red;
  width: 800px;
  height: 480px;
`;

const GameScreen = observer(() => {
    const gameStore = useContext(GameStore);
    const [node, setRef] = useState(null);

    const draw = () => {
        gameStore.map.map((row, rowIndex) => {
            row.map((col, colIndex) => {
                drawTile({context: node.getContext('2d'), x: colIndex * 16, y: rowIndex * 16, walkable: col.walkable});
            });
        });
    };

    /*const draw = () => {
        drawCircle({context: node.getContext('2d'), x: 50, y: 50, radius: 5, color: '#FF0000'});
        drawPlayer();
        drawTile();
    };*/

    /*const drawPlayer = () => {
        drawCircle({context: node.getContext('2d'), x: 100, y: 100, radius: 10, color: 'yellow'});
        drawCircleStroke({
            context: node.getContext('2d'),
            x: 100,
            y: 100,
            radius: 10,
            start: 1.5 * Math.PI,
            end: 0.5 * Math.PI,
            color: '#CCEBA6'
        });
    };

    const drawTile = () => {
        drawRectangle({context: node.getContext('2d'), x: 0, y: 0, sizeX: 16, sizeY: 16, color: '#1D1A3A'});
        drawRectangle({context: node.getContext('2d'), x: 16, y: 16, sizeX: 16, sizeY: 16, color: '#6158E0'});
    };*/

    useEffect(draw, [gameStore.map]);

    useEffect(
        () => {
            if (node) {
                // your Hook now has a reference to the ref element.
                // scale for retina screens
                node.getContext('2d').scale(2,2);
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
                    onClick={e => {}}
                />
            </CanvasContainer>
        </React.Fragment>
    )
});

export default GameScreen;
