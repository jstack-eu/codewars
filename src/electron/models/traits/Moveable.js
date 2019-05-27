module.exports = ({
  x = 0,
  y = 0,
  walking = false,
  speed = 1,
  direction = { up: false, down: true, left: false, right: false }
}) => (model) => {

    model.x = x;
    model.y = y;

    model.walking = walking;

    model.speed = speed;

    model.direction = direction;

    model.tick = R.compose(model.tick, (state) => {

        console.log('tick in Moveable' , state.speed);

        model.speed = state.speed;

        // if (model.walking) {
        //     if (direction.up) model.y -= speed;
        //     if (direction.down) model.y += speed;
        //     if (direction.left) model.x -= speed;
        //     if (direction.right) model.x += speed;
        // }

        return state;
    });

    return model;
};