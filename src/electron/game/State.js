const Settings = {
    tileSize: 16,
    tileXLength: 50,
    tileYLength: 30,
    playerRadius: 10,
    HP: 100,
    BulletDamage: 25
};

const state = {
    players: [],
    bullets: [],
    map: null
};

const initialize = (map) => {
    state.players = [];
    state.bullets = [];
    state.map = map;
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

const addPlayer = (player) => Players.push(player);
const addBullet = (bullet) => Bullets.push(bullet);

module.exports = {
    initialize,
    transport,
    players,
    bullets,
    map,
    settings,
    generateMap
};