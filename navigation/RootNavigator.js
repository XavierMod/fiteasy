// In App.js in a new project

import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {loadFile} from '../store/reducers/main';
import RNFS from 'react-native-fs';
import Dashboard from '../views/Dashboard';
import WeekExercises from '../views/WeekExercises';
import WithNavbar from '../layouts/WithNavbar';
import {navigationRef} from '../services/rootNavigation';
import Settings from '../views/Settings';
import i18n from '../config/i18n';

const Stack = createNativeStackNavigator();

async function moveAndroidFiles() {
  if (Platform.OS === 'android') {
    await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/load');
    const files = ['load/fiteasy-load.json'];
    await files.forEach(async file => {
      await RNFS.copyFileAssets(file, RNFS.DocumentDirectoryPath + '/' + file);
    });
  }
}

function RootNavigator() {
  const dispatch = useDispatch();
  const [activeRoute, setActiveRoute] = React.useState('');
  const loadFileLoaded = useSelector(state => state.main.loadFileLoaded);

  React.useEffect(() => {
    moveAndroidFiles();
    dispatch(loadFile());
  }, []);

  const getActiveRouteName = state => {
    const route = state.routes[state?.index || 0];
    if (route.state) {
      // Dive into nested navigators
      return getActiveRouteName(route.state);
    }
    return route?.name;
  };

  if (loadFileLoaded) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer
          onStateChange={state => setActiveRoute(getActiveRouteName(state))}
          ref={navigationRef}>
          <WithNavbar activeRoute={activeRoute || 'Home'} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Dashboard} />
            <Stack.Screen name="WeekExercises" component={WeekExercises} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <Text>not loaded</Text>
      </View>
    );
  }
}

export default RootNavigator;
