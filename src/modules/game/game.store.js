import {createContext} from 'react';
import {action, observable} from 'mobx';
import {fetchGameSettings, fetchMap, setupWsConnection} from './gameApi.service';

class GameStore {
    @observable map = [];
    @observable gameSettings = null;

    constructor() {
        this.fetchGameSettings()
            .then(() => this.fetchInitialMap())
            .then(() => setupWsConnection())
    }

    @action fetchInitialMap() {
        return fetchMap()
            .then(({data}) => this.map = data)
            .catch((err) => console.error('Fetching initial map failed ', err));
    }

    @action fetchGameSettings() {
        return fetchGameSettings()
            .then(({data}) => {
                console.log('data ', data);
                this.gameSettings = data
            })
            .catch(err => console.error('Fetching game settings failed ', err));
    }
}

export const GameStoreInstance = new GameStore();
export default createContext(GameStoreInstance);
