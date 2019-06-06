import React, {Component} from 'react';

import Moment from 'moment';

import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { withTheme } from 'react-native-paper';

import { Chip, Surface, Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class ForumItem extends Component {

  _icon = title => {
    return {
      'Admin': 'coffee',
      'Debian': 'debian',
      'Desktop': 'desktop-classic',
      'Development': 'bug',
      'Games': 'gamepad-variant',
      'General': 'comment-question',
      'GNU\'s Not Unix': 'cow',
      'Job': 'worker',
      'Gnome': 'gnome',
      'Linux General': 'comment-question',
      'Linux-hardware': 'harddisk',
      'Linux-install': 'settings',
      'Mobile': 'cellphone-android',
      'Mozilla': 'web',
      'Red Hat': 'hat-fedora',
      'Голосования': 'vote',
      'Разработка': 'code-tags',
    }[title] || 'puzzle';
  };

  render() {
    const { item } = this.props;
    const { colors } = this.props.theme;

    return (
      <View style={[styles.container]}>
        <View style={[styles.row]}>

          <View style={{width: 40}}>
            <View style={[styles.column, {alignItems: 'center'}]}>
              <Icon name={this._icon(item.title)} size={30} color={colors.accent} />
              <Text style={{fontSize: 12, color: colors.text}} >
                {item.now || '-'}
              </Text>
            </View>
          </View>

          <View style={[styles.column, {justifyContent: 'center', marginLeft: 8, marginRight: 12}]}>
            <Text style={{fontWeight: 'bold', color: colors.text, fontSize: 18}}>
              {item.title}
            </Text>
            <Text style={{color: colors.text, fontSize: 14}}>
              {item.description}
            </Text>
          </View>

        </View>
      </View>
    );
  }
}

export default withTheme(ForumItem);


const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
