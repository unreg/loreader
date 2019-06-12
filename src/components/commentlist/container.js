import React, {Component} from 'react';

import { FlatList, TouchableHighlight,
         View, StyleSheet, Platform, RefreshControl } from 'react-native';

import { withTheme } from 'react-native-paper';

import { FAB, Portal, Text } from 'react-native-paper';

import Divider from '../divider/container';
import Comment from '../comment/container';

import { store } from '../../store';
import { setConversationVisited } from '../../screens/conversation/actions';
import { getCommentList } from '../../api/lor';


class CommentList extends Component {

  state = {
    fab_icon: null,
    refreshing: false,
    items: []
  };

  _setState = data => {
    if (this.mounted) {
      this.setState(data);
    }
  };

  componentDidMount() {
    this.mounted = true;
  };

  _getComments = async () => {
    try {
      const items = await getCommentList(this.props.href);
      this._setState({items});

      const { topic, visited = {} } = store.getState().ConversationState.ConversationData;
      const last = visited[topic.key] || null;

      const { autoScroll } = store.getState().AppState.AppData;
      if (autoScroll) {
        if (last) {
          const t = items
            .map((item, i) => ({key: item.key, i}))
            .filter(item => item.key === last)
          const index = t.length ? t[0].i : 0;
          if (t.length) {
            setTimeout(() => {this.refs.flatList.scrollToIndex({index})}, 1000)
          }
        }
      }

      visited[topic.key] = items[items.length - 1].key;
      store.dispatch(setConversationVisited(visited));
    } catch (error) {
      console.log('Get comments', error)
    }
  };

  async componentDidUpdate(prevProps) {
    try {
      if (this.props.href && (this.props.href !== prevProps.href)) {
        this._setState({items: []});
        await this._getComments();
      }
    } catch(error) {
      console.log('Comment list update', error)
    }
  };

  componentWillUnmount() {
    clearTimeout(this.fab_timer);
    this._setState({fab_icon: null});
    this.mounted = false;
  };

  _onRefresh = async () => {
    try {
      await this._getComments();
    } catch (error) {
      console.log('Comment list refresh', error)
    }
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
    const { items } = this.props;

    return (
      <View style={{flex: 1}}>
        <FlatList

          ref={"flatList"}

          onScrollEndDrag={this._onScrollEndDrag}
          onScrollBeginDrag={this._onScrollBeginDrag}

          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {this._onRefresh()}}
            />}

          // ItemSeparatorComponent={({highlighted}) => <Divider />}

          // data={[...items, ...[{key: 'msg-end-empty'}]]}
          initialNumToRender={50} //listview optimization
          pageSize={50}
          data={this.state.items}

          renderItem={ ({item, separators }) => (
            <TouchableHighlight
              refreshing={true}
              onPress={() => {}}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <Comment item={item} />
            </TouchableHighlight>
          )}
        />

        <Portal>
        <FAB
          icon={this.state.fab_icon || 'keyboard-arrow-down'}
          visible={this.state.fab_icon || false}
          theme={this.props.theme}
          style={{
            position: 'absolute',
            bottom: 25, right: 25,
          }}
          onPress={this._onFabPress}
        />
        </Portal>
      </View>
    );
  }
}

export default withTheme(CommentList);


const styles = StyleSheet.create({
});
