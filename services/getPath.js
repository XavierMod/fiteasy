import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

/**
 * Gets the static assets path depending on which device is running it.
 */

export const getMainPath = () =>
  ({
    android: RNFS.DocumentDirectoryPath,
    ios: RNFS.MainBundlePath + '/assets',
  }[Platform.OS]);

/**
 * Gets the static assets path depending on which device is running it.
 */
export default () => `${RNFS.DocumentDirectoryPath}/assets/load`;