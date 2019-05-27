const Model = require('models/abstract/Model');

const Moveable = require('models/traits/Moveable');

const Bullet = ({
    id,
    player
}) => (model) => {

    model.id = id;
    model.player = player;

    model.tick = (state) => {

        return state;
    };

    model.asTransportableState = () => [model.x, model.y, model.player];

    return model;
};

module.exports = (config) => Model(config, Bullet, Moveable);