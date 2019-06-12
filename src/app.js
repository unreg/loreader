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
import Loading from './screens/loading/container';

import { store, persistor } from './store';
import { setAppToggleTheme } from './actions';

const PreferencesContext: any = createReactContext();
const AppContainer = createAppContainer(AppTabs);


const darkTheme = {
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


const whiteTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    primary: '#30579a',
    accent: '#30579a',
    accent_alt: '#547f2f',
    text: '#070707',
    comment: '#ececec',
  }
};


class LOReader extends Component {

  state = {
    theme: darkTheme
  };

  _actionAfterRehydration = () => {
    const { isDarkTheme } = store.getState().AppState.AppData;
    this.setState({theme: isDarkTheme ? darkTheme : whiteTheme});
    StatusBar.setBackgroundColor(isDarkTheme ? darkTheme.colors.primary : whiteTheme.colors.primary);
    store.dispatch(setAppToggleTheme(this._toggleTheme))
  };

  _toggleTheme = () => {
    const { isDarkTheme } = store.getState().AppState.AppData;
    StatusBar.setBackgroundColor(!isDarkTheme ? darkTheme.colors.primary : whiteTheme.colors.primary);
    this.setState({theme: !isDarkTheme ? darkTheme : whiteTheme});
  };

  componentDidMount() {
    Orientation.lockToPortrait();
  };


  render() {
    return (
      <StoreProvider store={store}>
        <PersistGate loading={<Loading action={this._actionAfterRehydration} />} persistor={persistor}>
          <PaperProvider theme={this.state.theme}>
            <AppContainer />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    );
  }
}


export default LOReader;
