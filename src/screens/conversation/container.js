import React, {Component} from 'react';
import { connect } from 'react-redux';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { BackHandler, Dimensions, View, StyleSheet } from "react-native";
import { withTheme, Colors } from 'react-native-paper';

import { Appbar, Snackbar, Text } from 'react-native-paper';

import { strings } from '../../i18n';

import CommentList from '../../components/commentlist/container';

import { store } from '../../store';
import { getConversationPages } from '../../api/lor';


class ConversationScreen extends React.Component {

  state = {
    currentPage: 1,
    pages: [],
    snack_visible: false
  };

  _didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
  );

  onBackButtonPressAndroid = () => {
    this._goBack();
    return true;
  };

  async componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    try {
      this.mounted = true;
      const pages = await getConversationPages(this.props.data.topic);
      if (this.mounted) {
        this.setState({currentPage: pages.length, pages});
      }
    } catch (error) {
      console.log('get conversation pages', error)
    }
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();

    this.mounted = false;
  };

  _onItemPress = item  => {};

  _goBack = () => {
    this.props.navigation.goBack();
  };

  onSwipeRight(gestureState) {
    console.log('Prev page');
    this.setState({
      currentPage: this.state.currentPage === 1 ? 1 : this.state.currentPage - 1
    });
    this.setState({ snack_visible: true })
  };

  async onSwipeLeft(gestureState) {
    try {
      console.log('Next page');
      const newPage = this.state.currentPage + 1;
      if (newPage > this.state.pages.length) {
        const pages = await getConversationPages(this.props.data.topic);
        if (this.mounted) {
          this.setState({currentPage: pages.length, pages});
        }
      } else {
        this.setState({currentPage: newPage})
      }
      this.setState({ snack_visible: true })
    } catch(error) {
      console.log('Swipe right error', error)
    }
  };

  render() {
    const { topic } = this.props.data;
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    const gesture_config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <View style={[styles.container, {backgroundColor: background}]}>
        <Appbar.Header theme={this.props.theme}>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content
            title={topic.title}
            subtitle={topic.forum}
          />
        </Appbar.Header>

        <GestureRecognizer
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}

          config={gesture_config}

          style={{flex: 1}}
        >
          <CommentList href={this.state.pages[this.state.currentPage - 1]} />
        </GestureRecognizer>

        <Snackbar
          visible={this.state.snack_visible}
          onDismiss={() => this.setState({ snack_visible: false })} >
          {`Page ${this.state.currentPage} of ${this.state.pages.length}`}
        </Snackbar>
      </View>
    );
  }
}

const mapStateProps = store => ({
  data: store.ConversationState.ConversationData,
});

export default connect(mapStateProps)(withTheme(ConversationScreen));


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
