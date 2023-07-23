import {
  logger,
  fileAsyncTransport,
  consoleTransport,
} from 'react-native-logs';
import RNFS from 'react-native-fs';
import { InteractionManager } from 'react-native';

const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: __DEV__ ? 'debug' : 'error',
  transport: [consoleTransport, fileAsyncTransport],
  transportOptions: {
    FS: RNFS,
    fileName: `log_${date}_${month}_${year}.log`,
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

export const log = logger.createLogger({
  ...defaultConfig,
  async: true,
  asyncFunc: InteractionManager.runAfterInteractions,
});

export const retrieveLogs = () => {
  return RNFS.readFile(
    `${RNFS.DocumentDirectoryPath}/log_${date}_${month}_${year}.log`,
    'utf8',
  )
    .then(contents => {
      return contents;
    })
    .catch(err => {
      console.log(err);
    });
};
