import React, {Component} from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet } from "react-native";
import { withTheme, Colors } from 'react-native-paper';

import { Appbar, Text } from "react-native-paper";

import { strings } from '../../i18n';

import { getTopicList, getCommentsList } from '../../api/lor';

import TopicList from '../../components/topiclist/container';

import { store } from '../../store';
import { setConversationTopic } from '../conversation/actions';
import { setFavouritesTopics } from '../favourites/actions';


class TrackerScreen extends React.Component {

  refreshFunc = async () => {
    try {
      return await getTopicList();
    } catch(error) {
      console.log('getTopicsList error', error)
    }
  };

  _onItemPress = item => async () => {
    store.dispatch(setConversationTopic(item));
    this.props.navigation.navigate('conversation');
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

  _favouriteIcon = key => {
    const { topics } = this.props.data_favourites;

    return Object.keys(topics).indexOf(key) === -1 && 'star-outline' || 'star';
  };


  render() {

    return (
      <View style={[styles.container]}>

        <Appbar.Header theme={this.props.theme}>
          <Appbar.Action icon="rss-feed" />
          <Appbar.Content
            title={'LINUX.ORG.RU'}
            subtitle={strings('screen_title.tracker')}
          />
        </Appbar.Header>

        <TopicList
          // items={this.props.data.items}
          with_forum_title={true}

          refreshFunc={this.refreshFunc}
          onItemPress={this._onItemPress}
          favouritesPress={this._favouritesPress} />

      </View>
    );
  }
}

const mapStateProps = store => ({
  data: store.TrackerState.TrackerData,
  data_favourites: store.FavouritesState.FavouritesData,
});

export default connect(mapStateProps)(withTheme(TrackerScreen));


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
