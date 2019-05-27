import React, {PureComponent} from 'react';

const electron = window.require('electron').remote;

class HomeScreen extends PureComponent {

    constructor (props) {
        super(props);
    }


    render() {
        return <h3>Home Screen</h3>;
    }
}

export default HomeScreen;