const Model = require('models/abstract/Model');

const Moveable = require('models/traits/Moveable');

const Bullet = ({
    id
}) => (model) => {

    model.tick = (state) => {

        return state;
    };

    model.asTransportableState = () => [model.x, model.y];

    return model;
};

module.exports = (config) => Model(config, Bullet, Moveable);