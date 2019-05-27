export const drawCircle = ({context, x, y, radius, color}) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(
        x,
        y,
        radius,
        0,
        2 * Math.PI
    );
    context.closePath();
    context.fill();
};

export const drawCircleStroke = ({context, x, y, radius, start, end, color}) => {
    context.beginPath();
    context.arc(
        x, y, radius, start, end
    );
    context.lineWidth = 3;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
};

export const drawRectangle = ({context, x, y, sizeX, sizeY, color}) => {
    context.fillStyle = color;
    context.fillRect(x, y, sizeX, sizeY)
};
