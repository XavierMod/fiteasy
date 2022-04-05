import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import RootNavigator from './navigation/RootNavigator';
import store from './store/store';
import {ThemeProvider} from 'styled-components';
import theme from './theme.json';

const App = () => {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
};
export default App;
