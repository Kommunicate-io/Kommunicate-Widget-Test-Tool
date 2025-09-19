import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import MainContext from '../../store/MainContext';

// JavaScript Editor for Kommunicate options with function support
const JsonEditor: React.FC = () => {
  const { options, updateOptions } = React.useContext(MainContext);

  return (
    <MonacoEditor
      height="450px"
      theme="vs-dark"
      width="100%"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
      }}
      // language="javascript"
      onChange={(e) => {
        if (typeof e == 'string') {
          updateOptions(e);
        }
      }}
      value={options}
    />
  );
};

export default JsonEditor;
