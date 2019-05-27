const State = require('game/State');

const create = () => {
    State.initialize();

    State.generateMap((settings) => R.range(0, settings.tileYLength)
                                        .map((x) => R.range(0, settings.tileXLength)
                                                        .map((y) => ({ walkable: x + y % 6 !== 0 }))))
};

const start = () => {



};

module.exports = {
    create,
    start
};
