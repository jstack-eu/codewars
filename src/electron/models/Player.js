const Model = require('models/abstract/Model');

const State = require('game/State');

const Moveable = require('models/traits/Moveable');
const Nameable = require('models/traits/Nameable');

const Player = ({
    id,
    color,
    hp,
    nickname,
    shooting = false,
    shootingDelay
}) => (model) => {

    model.id = id;
    model.color = color;
    model.hp = hp;
    model.nickname = nickname;
    model.shooting = shooting;
    model.shootingDelay = shootingDelay;
    model.lastShotFired = 0;

    model.tick = (state) => {

        if (model.shooting && Date.now() > model.lastShotFired + model.shootingDelay) {
            State.addBullet({ x: model.x, y: model.y });
        }

        return state;
    };

    model.asTransportableState = () => [model.id, model.x, model.y, model.hp];

    return model;
};

module.exports = (config) => Model(config, Player, Moveable, Nameable);