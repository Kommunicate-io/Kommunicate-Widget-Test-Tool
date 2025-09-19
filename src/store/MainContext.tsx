import React from 'react';
import { DEFAULT_OPTIONS, ENVIRONMENT, EnvInterface } from '../Helper/Constant';
import Kommunicate from '../Script/kmScript';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const MainContext = React.createContext<Context>({
  envs: [],
  appId: '',
  runScript: false,
  currentEnv: ENVIRONMENT[0],
  options: '',
  setCurrentEnv: (option) => {},
  setAppId: (value) => {},
  runKmScript: () => {},
  handleRunScript: (bool: boolean) => {},
  updateOptions: (value: string) => {},
  updateEnvs: () => {},
});

export const MainProvider: React.FC<MainType> = ({ children }) => {
  const [envs, setEnvs] = React.useState(ENVIRONMENT);
  const [currentEnv, setCurrentEnv] = React.useState(
    ENVIRONMENT[0] as EnvInterface,
  );
  const [appId, setAppId] = React.useState(currentEnv.appId);
  const [runScript, setRunScript] = React.useState(false);
  const [options, setOptions] = React.useState(DEFAULT_OPTIONS); // JavaScript object string with functions support
  const { currentServer } = useSelector((state: RootState) => state.env);

  React.useEffect(() => {
    setAppId(currentEnv.appId);
  }, [currentEnv]);

  const handleRunScript = (bool: boolean) => {
    setRunScript(bool);
  };

  const runKmScript = () => {
    let opt = {
      environment: currentEnv.name,
      popupWidget: true,
      automaticChatOpenOnNavigation: true,
    };

    try {
      // Parse JavaScript object with functions
      // Remove comments and parse
      const cleanOptions = options.replace(/\/\/.*$/gm, '').trim();
      // eslint-disable-next-line no-new-func
      const parsedOptions = new Function('return ' + cleanOptions)();
      opt = { ...opt, ...parsedOptions };
    } catch (error) {
      console.error('Error parsing options:', error);
      // Fallback to JSON parsing for backward compatibility
      try {
        opt = { ...opt, ...JSON.parse(options) };
      } catch (jsonError) {
        console.error('Error parsing options as JSON:', jsonError);
      }
    }
    handleRunScript(true);
    Kommunicate.init(appId, opt, currentServer.value);
  };

  const updateOptions = (value: string) => {
    if (value.trim() === '') {
      value = DEFAULT_OPTIONS;
    }

    // Basic validation for JavaScript object syntax
    try {
      const cleanValue = value.replace(/\/\/.*$/gm, '').trim();
      // eslint-disable-next-line no-new-func
      new Function('return ' + cleanValue);
    } catch (error) {
      console.warn('Invalid JavaScript syntax in options:', error);
      // Still allow the value to be set, but log a warning
    }

    setOptions(value);
  };

  const updateEnvs = (arry: EnvInterface[]) => {
    setEnvs(arry);
  };

  const value: Context = {
    envs,
    appId,
    currentEnv,
    runScript,
    options,
    setCurrentEnv,
    setAppId,
    runKmScript,
    handleRunScript,
    updateOptions,
    updateEnvs,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContext;

type MainType = {
  children?: React.ReactNode;
};

type Context = {
  envs: EnvInterface[];
  appId: string;
  currentEnv: EnvInterface;
  runScript: boolean;
  options: string;
  setCurrentEnv: (option: EnvInterface) => void;
  setAppId: (value: string) => void;
  runKmScript: () => void;
  handleRunScript: (bool: boolean) => void;
  updateOptions: (value: string) => void;
  updateEnvs: (arry: EnvInterface[]) => void;
};
