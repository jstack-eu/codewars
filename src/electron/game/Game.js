const State = require('game/State');
const Connector = require('communication/sockets/Connector');

const TPS = 30;

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

        Connector.broadcastState(State.asTransportableState());

    }, 1000 / TPS);

};

module.exports = {
    create,
    start
};