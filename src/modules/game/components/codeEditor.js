import React, {useContext} from 'react';
import AceEditor from 'react-ace';
import {observer} from 'mobx-react-lite';

import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';
import GameStore from '../game.store';

const CodeEditor = observer(() => {
    const gameStore = useContext(GameStore);

    return (
        <AceEditor
            mode="javascript"
            height='228px'
            width='100%'
            theme="solarized_dark"
            onChange={(v) => gameStore.setScriptCode(v)}
            value={gameStore.scriptCode}
            name="code-editor"
            highlightActiveLine={true}
            editorProps={{$blockScrolling: true}}
        />
    )
});

export default CodeEditor;
