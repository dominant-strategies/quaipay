import {
  logger,
  fileAsyncTransport,
  consoleTransport,
} from 'react-native-logs';
import RNFS from 'react-native-fs';
import { InteractionManager } from 'react-native';

const logDirectory = RNFS.DocumentDirectoryPath;
const logRetentionPeriodInDays = 7;

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
    `${logDirectory}/log_${date}_${month}_${year}.log`,
    'utf8',
  )
    .then(contents => {
      return contents;
    })
    .catch(err => {
      log.error(err);
    });
};

export const deleteOldLogFiles = async (): Promise<void> => {
  try {
    const files = await RNFS.readDir(logDirectory);
    const now = Date.now();
    const thresholdDate = now - logRetentionPeriodInDays * 24 * 60 * 60 * 1000;

    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.log')) {
        const fileCreationTime = new Date(file.ctime ?? 0).getTime();
        if (fileCreationTime < thresholdDate) {
          await RNFS.unlink(file.path);
          log.info(`Deleted log file: ${file.name}`);
        }
      }
    }
  } catch (error) {
    log.error`Error deleting log files: ${error}`;
  }
};
