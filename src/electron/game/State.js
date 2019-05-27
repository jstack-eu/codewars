const Player = require('models/Player');
const Bullet = require('models/Bullet');

const Settings = {
    tileSize: 16,
    tileXLength: 50,
    tileYLength: 30,
    playerRadius: 10,
    HP: 100,
    bulletDamage: 25
};

const state = {
    players: [],
    bullets: [],
    map: null
};

let playerSequence = 1;

const initialize = (map) => {
    state.players = [];
    state.bullets = [];
    state.map = map;

    playerSequence = 1;
};

const generateMap = (generator) => {
    state.map = generator(Settings);
};

const players = () => state.players;
const bullets = () => state.bullets;
const map = () => state.map;
const settings = () => Settings;

const asTransportableState = ({ getTransportableState }) => getTransportableState();

const transport = () => [
    players().map(asTransportableState),
    bullets().map(asTransportableState)
];

const addPlayer = (config) => {

    // TODO: Free up the sequence ID whenever a player leaves...
    const player = Player({ hp: Settings.HP, id: playerSequence++, ...config});

    state.players.push(player);

    return player;
};

const addBullet = (config) => {
    const bullet = Bullet({ damage: Settings.bulletDamage, ...config});

    state.bullets.push(bullet);

    return bullet;
};

const tick = () => {

    const tick = (model) => model.tick(state);

    state.players.forEach(tick);
    state.bullets.forEach(tick);

    return transport();

};

module.exports = {
    initialize,
    transport,
    players,
    bullets,
    map,
    settings,
    generateMap,
    addPlayer,
    addBullet,
    tick
};