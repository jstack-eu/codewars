import React, {useContext, useEffect, useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import GameStore from './game.store';
import {observer} from 'mobx-react-lite';
import {drawBullet, drawPlayer, drawTile} from './gameDraw.service';
import CodeEditor from './components/codeEditor';
import {systemProps} from '@eu.jstack/theme-utils';

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

const Canvas = styled.canvas`
    position: absolute;
    width: 800px;
    height: 480px;
    
    ${systemProps.position}
`;

const CodeEditorContainer = styled.div`
    margin-top: 480px;
`;

const GameScreen = observer(() => {
    const gameStore = useContext(GameStore);
    const [nodes, setRefs] = useState([]);

    const draw = () => {
        const [playerNode, bulletsNode, mapNode] = nodes;

        if (nodes) {
            nodes.forEach(n => n.getContext('2d').clearRect(0, 0, 1600, 960));
        }

        gameStore.map.map((row, rowIndex) => {
            row.map((col, colIndex) => {
                drawTile({context: mapNode.getContext('2d'), x: colIndex * 16, y: rowIndex * 16, walkable: col.walkable});
            });
        });
        gameStore.players.map(player => drawPlayer({
            context: playerNode.getContext('2d'),
            x: player.x,
            y: player.y,
            color: player.color
        }));
        gameStore.bullets.map(bullet => drawBullet({
            context: bulletsNode.getContext('2d'),
            x: bullet.x,
            y: bullet.y
        }))
    };

    const addNodeRef = (ref) => {
        if (!ref) {
            return;
        }
        nodes.push(ref);
        setRefs(nodes);
    };

    useEffect(draw, [gameStore.map, gameStore.players]);

    useEffect(
        () => {
            if (nodes.length === 2) {
                // your Hook now has a reference to the ref element.
                // scale for retina screens
                nodes.forEach(n => n.getContext('2d').scale(2, 2));
            }
        },
        [nodes],
    );

    return (
        <React.Fragment>
            <GlobalStyle/>
            <Canvas
                id='player-canvas'
                zIndex={3}
                height={960}
                width={1600}
                ref={addNodeRef}
                onClick={e => {}}
            />
            <Canvas
                id='bullets-canvas'
                zIndex={2}
                height={960}
                width={1600}
                ref={addNodeRef}
                onClick={e => {}}
            />
            <Canvas
                id='map-canvas'
                zIndex={1}
                height={960}
                width={1600}
                ref={addNodeRef}
                onClick={e => {}}
            />
            <CodeEditorContainer>
                <CodeEditor/>
            </CodeEditorContainer>
        </React.Fragment>
    )
});

export default GameScreen;
