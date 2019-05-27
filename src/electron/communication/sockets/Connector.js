const Hash = require('object-hash');
const State = require('game/State');

const TransportableStateHelper = require('communication/helpers/TransportableStateHelper');

const Clients = {  };

const clients = () => Object.values(Clients);

const broadcast = (name, data) => Object.values().forEach((socket) => socket.send(name, data));

const broadcastState = (state) => broadcast('state', TransportableStateHelper.encode(state));

const initialize = (IO) => {

    IO.on('connection', (socket) => {
        Clients[Hash(socket)] = socket;

        // Reads
        socket.on('fetch-map', () => socket.emit('received-map', State.map()));
        socket.on('fetch-players', () => socket.emit('received-players', State.players()));

        // Creates
        socket.on('new-player', (config) => IO.emit('player-received', State.addPlayer(config)));
    });

};

module.exports = { initialize, broadcast, broadcastState, clients };