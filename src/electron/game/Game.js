const State = require('game/State');
const Connector = require('communication/sockets/Connector');
const TimerHelper = require('game/helpers/TimerHelper');

const TPS = 1;
const TickDelay = 1000 / TPS;
const CommunicationDelay = 2500;

const create = () => {
    State.initialize();

    State.generateMap((settings) => R.range(0, settings.tileYLength)
                                        .map((x) => R.range(0, settings.tileXLength)
                                                        .map((y) => ({ walkable: x + y % 6 !== 0 }))))
};

const start = () => {

    TimerHelper(() => {

        const transportableState = State.tick();

        // Delaying sending the message to the clients
        setTimeout(Connector.broadcastState(transportableState), CommunicationDelay);

    }, TickDelay);

};

module.exports = {
    create,
    start
};
