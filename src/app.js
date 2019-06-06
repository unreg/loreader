import React, {Component} from 'react';

import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { StatusBar, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';

import Orientation from 'react-native-orientation-locker';

import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme
} from 'react-native-paper';

import createReactContext from 'create-react-context';

import AppTabs from './navigators/tabs';

import { store, persistor } from './store';

const PreferencesContext: any = createReactContext();
const AppContainer = createAppContainer(AppTabs);


const theme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    background: '#2e3436',
    primary: '#555753',
    accent: '#e9b96e',
    accent_alt: '#547f2f',
    text: '#d3d7cf',
    comment: '#272c2d',
  }
};


class LOReader extends Component {

  componentDidMount() {
    Orientation.lockToPortrait();

    StatusBar.setBackgroundColor(theme.colors.primary);
  };


  render() {
    return (
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <AppContainer />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}


export default LOReader;
