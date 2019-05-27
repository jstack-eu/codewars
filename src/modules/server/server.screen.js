import React, {PureComponent} from 'react';

const electron = window.require('electron').remote;

class ServerScreen extends PureComponent {

    constructor (props) {
        super(props);
    }


    render() {
        return <h3>Server Screen</h3>;
    }
}

export default ServerScreen;