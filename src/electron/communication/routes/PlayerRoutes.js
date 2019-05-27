const State = require('game/State');

module.exports = (App) => {

    App.get('/player/nickname/availability', (req, res) => res.status(200).send(!State.players().find((p) => p.nickname === req.query.nickname)));

};