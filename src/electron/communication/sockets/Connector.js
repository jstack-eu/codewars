const Clients = {  };

const clients = () => Object.values(Clients);

const send = (event, data) => clients().forEach((client) => client.emit(event, data));

module.exports = { send };