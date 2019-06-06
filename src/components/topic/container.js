import React, {Component} from 'react';

import Moment from 'moment';

import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

import { withTheme } from 'react-native-paper';

import { Chip, Divider, Menu, Surface, Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { store } from '../../store';
import { getTSInfo } from '../../api/lor';


class TopicItem extends Component {

  state = {
    avatar: '',
    text: '...',
    menu_visible: false,
    favourites: false
  }

  async componentDidMount() {
    try {
      this.setState({
        favourites: Object.keys(store.getState().FavouritesState.FavouritesData.topics).indexOf(this.props.item.key) !== -1
      })

      this.mounted = true;
      const res = await getTSInfo(this.props.item.href);
      if (this.mounted) {
        this.setState(res);
      }
    } catch (error) {}
  };

  componentWillUnmount() {
    this.mounted = false;
  };

  _openMenu = () => this.setState({ visible: true });
  _closeMenu = () => this.setState({ visible: false });

  favouritesPress = () => {
    this.props.favouritesPress(this.props.item);
    this.setState({favourites: !this.state.favourites})
    this._closeMenu();
  };

  render() {
    const { item } = this.props;
    const { colors } = this.props.theme;

    return (
      <View style={[styles.container]}>
        <View style={[styles.column]}>

          <View style={[styles.row]}>

            <View style={{width: 40}}>
              <View style={[styles.column, {alignItems: 'center'}]}>
                {this.state.avatar.indexOf('/photos') === 0
                  &&  <Image
                        style={{width: 30, height: 30, borderRadius: 15}}
                        source={{uri: `https://linux.org.ru${this.state.avatar}`}}
                      />
                  ||  <Icon name={'account-circle'} size={30} color={colors.accent} />
                }
              </View>
            </View>

            <View style={[styles.column, {justifyContent: 'center', marginLeft: 8, marginRight: 12}]}>
              <Text style={{fontWeight: 'bold', color: colors.accent_alt, fontSize: 14}}>
                {item.starter}
              </Text>
              <Text style={{color: colors.text, fontSize: 12}}>
                {`${item.datetime_text}  ·  ➥ ${item.comments}`}
              </Text>
            </View>

            {this.props.with_forum_title
              &&  <View style={[styles.column, {justifyContent: 'center', marginRight: 12}]}>
                    <Text style={{color: colors.accent, fontSize: 16}}>
                      {item.forum}
                    </Text>
                  </View>}

            <View style={{width: 40}}>
              <View style={[styles.column, {alignItems: 'flex-start', marginRight: 10}]}>
                <Menu
                  visible={this.state.visible}
                  onDismiss={this._closeMenu}
                  anchor={
                    <TouchableOpacity onPress={this._openMenu}>
                      <Icon name={'dots-vertical'} size={20} color={colors.accent} />
                    </TouchableOpacity>
                  } >
                  <Menu.Item
                    onPress={this.favouritesPress}
                    icon={this.state.favourites ? 'star' : 'star-border'}
                    title={this.state.favourites ? 'в избранном' : 'в избранное'}
                  />
                  <Divider />
                  {item.tags.map((item, i) => <Menu.Item key={i} icon={'local-offer'} title={item} />)}
                </Menu>
              </View>
            </View>

          </View>

          <Text style={{color: colors.accent, fontSize: 16, margin: 5}}>
            {item.title}
          </Text>

          <Text style={{color: colors.text, fontSize: 16, margin: 5}}>
            {this.state.text}
          </Text>

        </View>
      </View>
    );
  }
}

export default withTheme(TopicItem);


const styles = StyleSheet.create({
  container: {
    // height: 70,
    width: '100%',
    margin: 8,
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
