import React, {Component} from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet } from "react-native";
import { withTheme, Colors } from 'react-native-paper';

import { Appbar, Text } from "react-native-paper";

import { strings } from '../../i18n';

import { getForumsList } from '../../api/lor';

import ForumsList from '../../components/forumslist/container';

import { store } from '../../store';
import { setLastTopicsForum } from '../last_topics/actions';


class ForumsScreen extends React.Component {

  _onItemPress = item => () => {
    store.dispatch(setLastTopicsForum(item));
    this.props.navigation.navigate('last_topics');
  };

  render() {
    return (
      <View style={[styles.container]}>

        <Appbar.Header theme={this.props.theme}>
          <Appbar.Action icon="format-list-bulleted" />
          <Appbar.Content
            title={'LINUX.ORG.RU'}
            subtitle={strings('screen_title.forums')}
          />
        </Appbar.Header>

        <ForumsList
          items={this.props.data.items}
          onItemPress={this._onItemPress}
        />
      </View>
    );
  }
}

const mapStateProps = store => ({
  data: store.ForumsState.ForumsData,
});

export default connect(mapStateProps)(withTheme(ForumsScreen));


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
