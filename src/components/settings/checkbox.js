import React, {Component} from 'react';

import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';

import { Checkbox, List } from 'react-native-paper';


class ListCheckboxItem extends Component {

  _rightCheckbox = (value, disabled, onPress) => (
    <View style={styles.item}>
      <View style={[styles.right]}>
        <Checkbox
          disabled={disabled}
          status={value ? 'checked' : 'unchecked'}
          onPress={onPress}
          color={this.props.theme.colors.accent}
        />
      </View>
    </View>
  );

  render() {
    const { title, description, value, disabled, onPress } = this.props;

    return (
      <List.Item
        right={props => this._rightCheckbox(value, disabled, onPress)}
        title={title} description={description}
      />
    );
  }
}

export default withTheme(ListCheckboxItem);


const styles = StyleSheet.create({
  item: {
    height: 40,
    margin: 8
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
