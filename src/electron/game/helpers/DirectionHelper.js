const increaseByDirection = (model, direction, amount) => {

    if (direction.up) model.y -= amount;
    if (direction.down) model.y += amount;
    if (direction.left) model.x -= amount;
    if (direction.right) model.x += amount;

    return model;
};

module.exports = {
    increaseByDirection
};