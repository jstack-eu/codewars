const Model = require('models/abstract/Model');

const Moveable = require('models/traits/Moveable');

const Bullet = () => (model) => {

    model.tick = (state) => {

        console.log('tick in Bullet');

        return state;
    };

    model.asTransportableState = () => [model.x, model.y];

    return model;
};

module.exports = (config) => Model(config, Player, Moveable, Nameable);