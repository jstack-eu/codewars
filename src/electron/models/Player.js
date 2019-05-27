const Model = require('models/abstract/Model');

const Moveable = require('models/traits/Moveable');
const Nameable = require('models/traits/Nameable');

const Player = ({
    color,
    hp,
    nickname
}) => (model) => {

    model.color = color;
    model.hp = hp;
    model.nickname = nickname;

    model.tick = (state) => {

        console.log('tick in Player');

        return state;
    };

    model.asTransportableState = () => [model.id, model.x, model.y, model.hp];

    return model;
};

module.exports = (config) => Model(config, Player, Moveable, Nameable);