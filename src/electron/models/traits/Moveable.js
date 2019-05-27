const DirectionHelper = require('game/helpers/DirectionHelper');

module.exports = ({
    x = 0,
    y = 0,
    moving = false,
    speed = 1,
    direction = { up: false, down: true, left: false, right: false },
    dissolveOnHit = false,
    radius = 0
}) => (model) => {

    model.x = x;
    model.y = y;

    model.moving = moving;

    model.speed = speed;

    model.direction = direction;

    model.radius = radius;

    model.dissolveOnHit = dissolveOnHit;

    model.tick = R.compose(model.tick, (state) => {

        const StateManager = require('game/State');

        if (model.moving) {
            DirectionHelper.increaseByDirection(model, model.direction, model.speed);
        }

        const dissolve = () => {
            // TODO: how to know what needs to be dissolved? I need the model type here... for now only bullets can dissolve...
            if (model.dissolveOnHit)
                StateManager.removeBullet(model.id);
        };

        // normalize positions and dissolve on hit
        if (model.y - model.radius < 0) {
            model.y = 0 + model.radius;

            dissolve();
        }

        if (model.y + model.radius > state.settings.tileYLength * state.settings.tileSize) {
            model.y = state.settings.tileYLength * state.settings.tileSize - model.radius;

            dissolve();
        }

        if (model.x - model.radius < 0) {
            model.x = 0 + model.radius;

            dissolve();
        }

        if (model.x + model.radius > state.settings.tileXLength * state.settings.tileSize) {
            model.x = state.settings.tileXLength * state.settings.tileSize - model.radius;

            dissolve();
        }


        return state;
    });

    return model;
};