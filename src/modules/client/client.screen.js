import React, {PureComponent} from 'react';

const electron = window.require('electron').remote;

class ClientScreen extends PureComponent {

    constructor (props) {
        super(props);
    }


    render() {
        return <h3>Client Screen</h3>;
    }
}

export default ClientScreen;