import React, {Component} from 'react';
import { connect } from 'react-redux';

import { BackHandler, View, StyleSheet } from "react-native";
import { withTheme, Colors } from 'react-native-paper';

import { Appbar, Text } from "react-native-paper";

import { strings } from '../../i18n';

import { getLastTopics, getCommentsList } from '../../api/lor';

import TopicList from '../../components/topiclist/container';

import { store } from '../../store';
import { setLastTopicsForum, setLastTopicsList } from './actions';
import { setFavouritesTopics } from '../favourites/actions';
import { setConversationTopic } from '../conversation/actions';


class LastTopics extends React.Component {

  refreshFunc = async () => {
    try {
      return await getLastTopics(this.props.data.forum);
    } catch(error) {
      console.log('getLastTopics error', error)
    }
  };

  _onItemPress = item => async () => {
    store.dispatch(setConversationTopic(item));
    this.props.navigation.navigate('conversation');
    try {
      await getCommentsList(item);
    } catch (error) {}
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  };

  _didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
  );

  onBackButtonPressAndroid = () => {
    this._goBack();
    return true;
  };

  _goBack = () => {
    store.dispatch(setLastTopicsList([]));
    store.dispatch(setLastTopicsForum({}));
    this.props.navigation.goBack();
  };

  _favouritesPress = item => {
    console.log(item);
    const { topics } = this.props.data_favourites;

    if (Object.keys(topics).indexOf(item.key) === -1) {
      topics[item.key] = item;
    } else {
      delete topics[item.key];
    }
    store.dispatch(setFavouritesTopics(topics))
  };

  render() {
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: background}]}>

        <Appbar.Header theme={this.props.theme}>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content
            title={this.props.data.forum.title}
            subtitle={this.props.data.forum.description}
          />
        </Appbar.Header>

        <TopicList
          with_forum_title={false}

          refreshFunc={this.refreshFunc}
          onItemPress={this._onItemPress}
          favouritesPress={this._favouritesPress} />
      </View>
    );
  }
}

const mapStateProps = store => ({
  data_favourites: store.FavouritesState.FavouritesData,
  data: store.LastTopicsState.LastTopicsData,
});

export default connect(mapStateProps)(withTheme(LastTopics));


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
