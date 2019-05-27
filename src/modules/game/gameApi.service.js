import socketIOClient from 'socket.io-client';
import {api} from '../../shared/api';

export const fetchMap = () => api.get('/game/map');
export const fetchGameSettings = () => api.get('/game/configuration');

export const setupWsConnection = () => {
    console.log('setup');
    const socket = socketIOClient('http://localhost:9001');

    socket.on('connect', () => console.log('connected!'));
    socket.on('player-received', (player) => console.log('player ', player));
    console.log('emit ', socket);
    socket.emit('new-player', {
        x: 8,
        y: 8
    });
};
