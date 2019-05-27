const TransportableStateHelper = require('communication/helpers/TransportableStateHelper');
const Connector = require('communication/Connector');

const transportState = (state) => Connector.send('state', TransportableStateHelper.encode(state));

module.exports = { transportState };