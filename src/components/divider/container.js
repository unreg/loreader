import React, {Component} from 'react';

import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';


class Divider extends Component {
  render() {
    return (
      <View style={[styles.separator, {backgroundColor: this.props.theme.colors.primary}]} />
    );
  }
}

export default withTheme(Divider);


const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "90%",
    marginLeft: "5%"
  },
});
