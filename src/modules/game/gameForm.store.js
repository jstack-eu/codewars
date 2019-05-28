import {createContext} from 'react';
import {action, observable} from 'mobx';

class GameFormStore {
    @observable nickname = '';
    @observable ip = '';

    @action setNickname(nickname) {
        this.nickname = nickname;
    }

    @action setIp(ip) {
        this.ip = ip;
    }
}

export const GameFormStoreInstance = new GameFormStore();
export default createContext(GameFormStoreInstance);
