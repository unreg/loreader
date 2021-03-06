import React, {Component} from 'react';
import { connect } from 'react-redux';

import { createStackNavigator, BottomTabBar } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { withTheme } from 'react-native-paper';

import TrackerScreen from '../screens/tracker/container';
import SettingsScreen from '../screens/settings/container';
import FavouritesScreen from '../screens/favourites/container';
import ForumsScreen from '../screens/forums/container';

import { routes } from './routes';

import { strings } from '../i18n';


const AppTabs = createMaterialBottomTabNavigator(
  {
    Tracker: {
      screen: TrackerScreen,
      navigationOptions: {
        title: strings('tabs.tracker'),
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='rss-feed'
            size={21}
            color={tintColor} />
         )
      }
    },
    Favourites: {
      screen: FavouritesScreen,
      navigationOptions: {
        title: strings('tabs.favourites'),
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='star'
            size={21}
            color={tintColor} />
         )
      }
    },
    Forums: {
      screen: ForumsScreen,
      navigationOptions: {
        title: strings('tabs.forums'),
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='format-list-bulleted'
            size={21}
            color={tintColor} />
         )
      }
    },
    Settings: {
      screen: SettingsScreen,
      screenProps: {
        foo: 'bar',
      },
      navigationOptions: {
        title: strings('tabs.settings'),
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name='settings'
            size={21}
            color={tintColor} />
         )
      }
    },

  }, {
    initialRouteName: 'Tracker',
});


const mapStateProps = store => ({
  data: store.AppState.AppData,
});


export default createStackNavigator(
    {
      AppTabs: {screen: AppTabs},
      ...routes,
    },
    { headerMode: "none" }
);
