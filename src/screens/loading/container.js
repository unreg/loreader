import React, {Component} from 'react';
import { connect } from 'react-redux';

import { ScrollView, StyleSheet } from "react-native";


class Loading extends React.Component {

  componentWillUnmount() {
    this.props.action();
  };

  render() {
    return (
      <ScrollView style={[styles.container]} />
    );
  }
}

const mapStateProps = store => ({
  data: store.AppState.AppData,
});

export default connect(mapStateProps)(Loading);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
