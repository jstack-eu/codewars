import {drawRectangle} from '../../shared/canvasDraw.helper';
import {GameStoreInstance} from './game.store';

export const drawTile = ({context, x, y, walkable}) => drawRectangle({
    context,
    x,
    y,
    sizeX: GameStoreInstance.gameSettings.tileSize,
    sizeY: GameStoreInstance.gameSettings.tileSize,
    color: walkable ? '#1D1A3A' : '#6158E0'
});
