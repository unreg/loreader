import React, {Component} from 'react';

import { FlatList, TouchableHighlight,
         View, StyleSheet, Platform, RefreshControl } from 'react-native';

import { withTheme } from 'react-native-paper';

import { FAB, Portal, Text } from 'react-native-paper';

import Divider from '../divider/container';
import ForumItem from '../forumitem/container';

import { getForumsList } from '../../api/lor';

import { store } from '../../store';
import { setForumsList } from '../../screens/forums/actions';


class ForumsList extends Component {

  state = {
    fab_icon: null,
    refreshing: false
  };

  _setState = data => {
    if (this.mounted) {
      this.setState(data);
    }
  };

  async componentDidMount() {
    try {
      this.mounted = true;
      const res = await getForumsList();
      if (this.mounted) {
        store.dispatch(setForumsList(res));
      }
    } catch (error) {
      console.log('Forums list mount', error)
    }
  };

  componentWillUnmount() {
    clearTimeout(this.fab_timer);
    this._setState({fab_icon: null});
    this.mounted = false;
  };

  _onRefresh = async () => {
    try {
      const res = await getForumsList();
      if (this.mounted) {
        store.dispatch(setForumsList(res));
      }
    } catch (error) {
      console.log('Forums list refresh', error)
    }
  };

  _onScroll = e => {
    console.log(e)
  };

  _onScrollBeginDrag = event => {
    this.y = event.nativeEvent.contentOffset.y;
  };

  _onScrollEndDrag = event => {
    clearTimeout(this.fab_timer);
    const { y } = event.nativeEvent.contentOffset;
    this._setState({fab_icon: this.y < y && 'keyboard-arrow-down' || 'keyboard-arrow-up'});
    this.fab_timer = setTimeout(() => {this._setState({fab_icon: null})}, 3000);
  };

  _onFabPress = () => {
    clearTimeout(this.fab_timer);
    if (this.state.fab_icon === 'keyboard-arrow-down') {
      this.refs.flatList.scrollToEnd();
      this._setState({fab_icon: 'keyboard-arrow-up'});
    } else {
      this.refs.flatList.scrollToIndex({index: 0});
      this._setState({fab_icon: 'keyboard-arrow-down'});
    }
    this.fab_timer = setTimeout(() => {this._setState({fab_icon: null})}, 3000);
  };

  render() {
    const { items, onItemPress } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref="flatList"

          onScrollEndDrag={this._onScrollEndDrag}
          onScrollBeginDrag={this._onScrollBeginDrag}

          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {this._onRefresh()}}
            />}

          ItemSeparatorComponent={({highlighted}) => <Divider />}

          data={items}

          renderItem={ ({item, separators }) => (
            <TouchableHighlight
              refreshing={true}
              onPress={onItemPress(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <ForumItem item={item} />
            </TouchableHighlight>
          )}
        />

        <FAB
          icon={this.state.fab_icon || 'keyboard'}
          visible={this.state.fab_icon || false}
          theme={this.props.theme}
          style={{
            position: 'absolute',
            bottom: 25, right: 25,
          }}
          onPress={this._onFabPress}
        />
      </View>
    );
  }
}

export default withTheme(ForumsList);


const styles = StyleSheet.create({
});
