import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import GameStore from './game.store';
import {observer} from 'mobx-react-lite';
import {drawBullet, drawPlayer, drawTile} from './gameDraw.service';
import CodeEditor from './components/codeEditor';
import {systemProps} from '@eu.jstack/theme-utils';

const Canvas = styled.canvas`
    position: absolute;
    width: 800px;
    height: 480px;
    
    ${systemProps.position}
`;

const GameViewContainer = styled.div`
    ${systemProps.common}
`;

const CodeEditorContainer = styled.div`
    margin-top: 480px;
`;

const GameScreen = observer(() => {
    const gameStore = useContext(GameStore);
    const [nodes, setRefs] = useState([]);

    const drawTiles = () => {
        const [playerNode, bulletsNode, mapNode] = nodes;

        mapNode.getContext('2d').clearRect(0, 0, 1600, 960);

        gameStore.map.map((row, rowIndex) => {
            row.map((col, colIndex) => {
                drawTile({
                    context: mapNode.getContext('2d'),
                    x: colIndex * 16,
                    y: rowIndex * 16,
                    walkable: col.walkable
                });
            });
        });
    };

    const drawPlayers = () => {
        const [playerNode] = nodes;

        playerNode.getContext('2d').clearRect(0, 0, 1600, 960);

        gameStore.players.map(player => drawPlayer({
            context: playerNode.getContext('2d'),
            x: player.x,
            y: player.y,
            color: player.color
        }));
    };

    const drawBullets = () => {
        const [playerNode, bulletsNode] = nodes;

        gameStore.bullets.map(bullet => drawBullet({
            context: bulletsNode.getContext('2d'),
            x: bullet.x,
            y: bullet.y,
            color: bullet.color
        }));
    };

    const addNodeRef = (ref) => {
        if (!ref) {
            return;
        }
        nodes.push(ref);
        setRefs(nodes);
    };

    useEffect(drawTiles, [gameStore.map]);
    useEffect(drawPlayers, [gameStore.players]);
    useEffect(drawBullets, [gameStore.bullets]);

    useEffect(
        () => {
            if (nodes.length === 3) {
                // scale for retina screens
                nodes.forEach(n => n.getContext('2d').scale(2, 2));
            }
        },
        [nodes],
    );

    return (
        <React.Fragment>
            <GameViewContainer p={3}>
                <Canvas
                    id='player-canvas'
                    zIndex={3}
                    height={960}
                    width={1600}
                    ref={addNodeRef}
                />
                <Canvas
                    id='bullets-canvas'
                    zIndex={2}
                    height={960}
                    width={1600}
                    ref={addNodeRef}
                />
                <Canvas
                    id='map-canvas'
                    zIndex={1}
                    height={960}
                    width={1600}
                    ref={addNodeRef}
                />
            </GameViewContainer>

            <CodeEditorContainer>
                <CodeEditor/>
            </CodeEditorContainer>
        </React.Fragment>
    )
});

export default GameScreen;
