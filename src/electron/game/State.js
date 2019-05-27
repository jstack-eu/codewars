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

const players = () => state.players;
const bullets = () => state.bullets;
const map = () => state.map;

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
};