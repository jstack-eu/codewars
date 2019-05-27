const State = require('game/State');
const Connector = require('communication/sockets/Connector');

const TPS = 30;
const TickDelay = 1000 / TPS;
const CommunicationDelay = 2500;

const TimerHelper = require('helpers/TimerHelper');

const create = () => {
    State.initialize();

    State.generateMap((settings) => R.range(0, settings.tileYLength)
                                        .map((x) => R.range(0, settings.tileXLength)
                                                        .map((y) => ({ walkable: x + y % 6 !== 0 }))))
};

const start = () => {

    TimerHelper(() => {

        State.tick();

        // Delaying sending the message to the clients
        setTimeout(Connector.broadcastState(State.asTransportableState()), CommunicationDelay);

    }, TickDelay);

};

module.exports = {
    create,
    start
};