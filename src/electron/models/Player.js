const Model = require('models/abstract/Model');

const DirectionHelper = require('game/helpers/DirectionHelper');

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

        // TODO: Weird require that is needed here... is bad for performance... but who cares atm.
        const StateManager = require('game/State');

        if (model.shooting && Date.now() > model.lastShotFired + model.shootingDelay) {
            StateManager.addBullet(DirectionHelper.increaseByDirection({ x: model.x, y: model.y, player: model.id }, model.direction, StateManager.settings().playerRadius + 3));
            model.lastShotFired = Date.now();
        }

        return state;
    };

    model.asTransportableState = () => [model.id, model.x, model.y, model.hp];

    return model;
};

module.exports = (config) => Model(config, Player, Moveable, Nameable);