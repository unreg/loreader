import React, {Component} from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet } from "react-native";
import { withTheme, Colors } from 'react-native-paper';

import { Appbar, Text } from "react-native-paper";

import { strings } from '../../i18n';

import { getCommentsList } from '../../api/lor';

import TopicList from '../../components/topiclist/container';

import { store } from '../../store';
import { setConversationTopic } from '../conversation/actions';
import { setFavouritesTopics } from '../favourites/actions';


class FavouritesScreen extends React.Component {

  refreshFunc = async () => {
    try {
      return Object.values(this.props.data.topics);
    } catch(error) {
      console.log('Get gavourites from storage error', error)
    }
  };

  _onItemPress = item => async () => {
    store.dispatch(setConversationTopic(item));
    this.props.navigation.navigate('conversation');
  };

  _favouritesPress = item => {
    const { topics } = this.props.data;

    if (Object.keys(topics).indexOf(item.key) === -1) {
      topics[item.key] = item;
    } else {
      delete topics[item.key];
    }
    store.dispatch(setFavouritesTopics(topics))
  };

  _favouriteIcon = key => {
    const { topics } = this.props.data;

    return Object.keys(topics).indexOf(key) === -1 && 'star-outline' || 'star';
  };


  render() {

    return (
      <View style={[styles.container]}>

        <Appbar.Header theme={this.props.theme}>
          <Appbar.Action icon="star" />
          <Appbar.Content
            title={'LINUX.ORG.RU'}
            subtitle={strings('screen_title.favourites')}
          />
        </Appbar.Header>

        <TopicList
          with_forum_title={true}

          refreshFunc={this.refreshFunc}
          onItemPress={this._onItemPress}
          favouritesPress={this._favouritesPress} />

      </View>
    );
  }
}

const mapStateProps = store => ({
  data: store.FavouritesState.FavouritesData,
});

export default connect(mapStateProps)(withTheme(FavouritesScreen));


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
