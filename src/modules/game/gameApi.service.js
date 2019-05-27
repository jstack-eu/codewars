import socketIOClient from 'socket.io-client';
import {api} from '../../shared/api';
import {GameStoreInstance} from './game.store';

export const fetchMap = () => api.get('/game/map');
export const fetchGameSettings = () => api.get('/game/configuration');

export const setupWsConnection = () => {
    const socket = socketIOClient('http://localhost:9001');

    socket.on('connect', () => console.log('connected!'));
    socket.on('player-received', (player) => GameStoreInstance.addNewPlayer(player));
    socket.emit('new-player', {
        x: 40,
        y: 40,
        color: 'red'
    });
};
