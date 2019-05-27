const Hash = require('object-hash');
const State = require('game/State');

const TransportableStateHelper = require('communication/helpers/TransportableStateHelper');

const Clients = {  };

const clients = () => Object.values(Clients);

const broadcast = (name, data) => Object.values(Clients).forEach((socket) => socket.emit(name, data));

const broadcastState = (state) => broadcast('state', TransportableStateHelper.encode(state));

const initialize = (IO) => {

    IO.on('connection', (socket) => {

        console.log('Connected new client', Hash(socket));

        Clients[Hash(socket)] = socket;

        // Reads
        socket.on('fetch-map', () => {
            console.log('Received fetch-map request');
            socket.emit('received-map', State.map())
        });

        socket.on('fetch-players', () => {
            console.log('Received fetch-players request');
            socket.emit('received-players', State.players())
        });

        // Creates
        socket.on('new-player', (config) => console.log('new player') || IO.emit('player-received', State.addPlayer(config)));
    });

};

module.exports = { initialize, broadcast, broadcastState, clients };
