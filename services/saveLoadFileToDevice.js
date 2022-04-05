import RNFS from 'react-native-fs';
import {getMainPath} from '../services/getPath';

export default saveLoadFileToDevice = async newFile => {
  const writeFile = await RNFS.writeFile(
    `${getMainPath()}/load/fiteasy-load.json`,
    JSON.stringify(newFile),
    'utf8',
  );
  console.log('Success?', writeFile);
};
