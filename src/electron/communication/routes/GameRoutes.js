const State = require('game/State');

module.exports = (App) => {

    App.get('/game/configuration', (req, res) => res.status(200).send(State.settings()));
    App.get('/game/map', (req, res) => res.status(200).send(State.map()));
    App.get('/game/state', (req, res) => res.status(200).send(State.transport()));

};