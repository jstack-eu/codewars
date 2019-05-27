const Player = require('models/Player');
const Bullet = require('models/Bullet');
const UUID = require('uuid/v4');

const Settings = {
    tileSize: 16,
    tileXLength: 50,
    tileYLength: 30,
    playerRadius: 10,
    playerShootingDelay: 1000,
    HP: 100,
    playerSpeed: 1,
    bulletDamage: 25,
    bulletSpeed: 3,
    bulletRadius: 5
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
    const player = Player({
        id: playerSequence++,
        hp: Settings.HP,
        speed: Settings.playerSpeed,
        radius: Settings.playerRadius,
        shootingDelay: Settings.playerShootingDelay,
    ...config});

    state.players.push(player);

    return player;
};

const addBullet = (config) => {
    const bullet = Bullet({
        id: UUID(),
        damage: Settings.bulletDamage,
        speed: Settings.bulletSpeed,
        moving: true,
        dissolveOnHit: true,
        radius: Settings.bulletRadius,
        direction: { up: false, down: true, left: false, right: false },
    ...config});

    state.bullets.push(bullet);

    return bullet;
};

const removeBullet = (id) => {
    state.bullets = state.bullets.filter((bullet) => bullet.id !== id);
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
    removeBullet,
    tick
};