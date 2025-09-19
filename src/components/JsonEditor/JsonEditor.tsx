import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import MainContext from '../../store/MainContext';

// JavaScript Editor for Kommunicate options with function support
const JsonEditor: React.FC = () => {
  const { options, updateOptions } = React.useContext(MainContext);

  return (
    <div 
      id="options-editor-container" 
      className="options-editor-wrapper"
      data-testid="options-editor-container"
    >
      <MonacoEditor
        height="450px"
        theme="vs-dark"
        width="100%"
        className="km-options"
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
    </div>
  );
};

export default JsonEditor;
