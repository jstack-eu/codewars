import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

const CodeEditor = () => {
    return (
        <AceEditor
            mode="javascript"
            height='250px'
            width='800px'
            theme="solarized_dark"
            onChange={() => {}}
            name="code-editor"
            highlightActiveLine={true}
            editorProps={{$blockScrolling: true}}
        />
    )
};

export default CodeEditor;
