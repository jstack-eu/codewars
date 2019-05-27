import {createContext} from 'react';
import {action, observable} from 'mobx';
import {fetchGameSettings, fetchMap, setupWsConnection} from './gameApi.service';

class GameStore {
    @observable map = [];
    @observable gameSettings = null;
    @observable players = [];
    @observable bullets = [];
    @observable scriptCode = `function run() {\n\n}`;

    constructor() {
        this.fetchGameSettings()
            .then(() => this.fetchInitialMap())
            .then(() => setupWsConnection())
    }

    @action setScriptCode(script) {
        this.scriptCode = script;
    }

    @action addNewPlayer(player) {
        if (this.players.some(p => p.id === player.id)) {
            return;
        }

        this.players = [...this.players, player];
    }

    @action setBullets(bullets) {
        const mapBullets = ([x, y, playerId]) => {
            const foundPlayer = this.players.find(p => p.id === playerId);

            if (!foundPlayer) {
                return null;
            }

            return {x, y, color: foundPlayer.color}
        };

        this.bullets = bullets
            .map(mapBullets)
            .filter((b) => b);
    }

    @action updatePlayers(players) {
        this.players = this.players.map((player) => {
            const foundPlayer = players.find(([id]) => player.id === id);

            if (foundPlayer) {
                const [id, x, y, hp] = foundPlayer;
                return {...player, x, y, hp};
            }

            return player;
        });
    }

    @action fetchInitialMap() {
        return fetchMap()
            .then(({data}) => this.map = data)
            .catch((err) => console.error('Fetching initial map failed ', err));
    }

    @action fetchGameSettings() {
        return fetchGameSettings()
            .then(({data}) => this.gameSettings = data)
            .catch(err => console.error('Fetching game settings failed ', err));
    }
}

export const GameStoreInstance = new GameStore();
export default createContext(GameStoreInstance);
