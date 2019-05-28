import {drawCircle, drawCircleStroke, drawRectangle} from '../../shared/canvasDraw.helper';
import {GameStoreInstance} from './game.store';
import theme from '../../shared/styles/theme';

export const drawTile = ({context, x, y, walkable}) => drawRectangle({
    context,
    x,
    y,
    sizeX: GameStoreInstance.gameSettings.tileSize,
    sizeY: GameStoreInstance.gameSettings.tileSize,
    color: walkable ? theme.colors.backgroundColor : theme.colors.baseGrey
});

export const drawPlayer = ({context, x, y, color}) => {
    drawCircle({context, x, y, radius: GameStoreInstance.gameSettings.playerRadius, color});
    drawCircleStroke({
        context,
        x,
        y,
        radius: GameStoreInstance.gameSettings.playerRadius,
        start: 1.5 * Math.PI,
        end: 0.5 * Math.PI,
        color: '#CCEBA6'
    });
};

export const drawBullet = ({context, x, y, color}) => drawCircle({
    context,
    x,
    y,
    radius: GameStoreInstance.gameSettings.bulletRadius,
    color: color
});
