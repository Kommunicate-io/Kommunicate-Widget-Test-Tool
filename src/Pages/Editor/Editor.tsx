import { Container } from './Editor.style';
import Env from '../../components/Env/Env';
import AppId from '../../components/AppId/AppId';
import JsonEditor from '../../components/JsonEditor/JsonEditor';
import { Outlet } from 'react-router-dom';

const Editor = () => {
  return (
    <Container className="editor-container">
      <Env />
      <AppId />
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500' }}>
          Options (JavaScript with Functions Support)
        </h3>
        <JsonEditor />
      </div>
      <Outlet />
    </Container>
  );
};
export default Editor;
