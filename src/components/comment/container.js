import React, {Component} from 'react';

import Moment from 'moment';
import HTML from 'react-native-render-html';

import { Image, ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';

import { withTheme } from 'react-native-paper';

import { Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


class Comment extends Component {
  render() {
    const { item } = this.props;
    const { colors } = this.props.theme;

    tagsStyles = {
      p: Object.assign({}, message_style.p, {color: colors.text}),
      blockquote: Object.assign({}, message_style.blockquote, {
        color: colors.text,
        backgroundColor: colors.background,
        borderColor: colors.accent
      }),
      code: Object.assign({}, message_style.code, {
        color: colors.text,
        backgroundColor: colors.background,
        borderColor: colors.accent
      }),
      pre: Object.assign({}, message_style.pre, {
        color: colors.text,
        backgroundColor: colors.background,
      }),
      h1: {
        fontSize: 18,
        color: colors.text,
      },
      ul: {
        color: colors.text,
      },
      ol: {
        color: colors.text,
      },
      li: {
        color: colors.text,
      }
    }

    classesStyles = {
      'code': Object.assign({}, message_style.code, {
        color: colors.text,
        backgroundColor: colors.background,
        borderColor: colors.accent
      })
    }

    return (
      item.message
        &&  <View style={[styles.container, {backgroundColor: colors.comment, borderRadius: 8}]}>

              <View style={[styles.column, {marginTop: 8, marginBottom: 8}]}>
                <View style={[styles.row]}>
                  <View style={{width: 80}}>
                    <View style={[styles.column, {alignItems: 'center'}]}>
                      {(item.creator.userpic.src.indexOf('d=blank') !== -1 || item.creator.userpic.src.indexOf('d=mm') !== -1 || item.creator.userpic.src.indexOf('p.gif') !== -1)
                        &&  <Icon name={'account-circle'} size={60} color={colors.text} />
                        ||  <Image
                              style={{width: 60, height: 60, borderRadius: 30}}
                              source={{uri: `https://linux.org.ru${item.creator.userpic.src}`}}
                            />
                      }
                      <Text style={{color: colors.accent_alt}}>
                        {item.creator.stars || '-----'}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.column, {justifyContent: 'flex-start', marginRight: 8}]}>
                    <View style={[styles.row, {justifyContent: 'flex-end'}]}>
                      <Text style={{fontWeight: 'bold', color: item.creator.user && colors.accent_alt || colors.text}}>
                        {item.creator.user || 'anonymous'}
                      </Text>
                      <Text style={{color: colors.accent}}>
                        {` · ${Moment(item.datetime).format('DD.MM.YY HH:mm:ss')}`}
                      </Text>
                    </View>

                    {item.response.datetime
                      &&  <View style={[styles.row, {justifyContent: 'flex-end'}]}>
                            <Text style={{color: colors.accent}}>
                              {'на '}
                            </Text>
                            <Text style={{fontWeight: 'bold', color: colors.accent_alt}}>
                              {item.response.creator}
                            </Text>
                            <Text style={{color: colors.accent}}>
                              {` · ${Moment(item.response.datetime).format('DD.MM.YY HH:mm:ss')}`}
                            </Text>
                          </View>}

                    <View style={[styles.row, {justifyContent: 'flex-start', marginLeft: 8}]}>
                      <Text style={{fontSize: 18, color: colors.accent}}>
                        {item.header || ''}
                      </Text>
                    </View>
                  </View>

                </View>

                <View style={[styles.column, {margin: 8}]}>
                  <HTML html={item.message}
                    tagsStyles={tagsStyles} classesStyles={classesStyles} />
                </View>

              </View>
            </View>
        ||  <View style={[styles.container, {backgroundColor: colors.comment, borderRadius: 8}]}>
              <Text>{''}</Text>
            </View>
    );
  }
}

export default withTheme(Comment);


const styles = StyleSheet.create({
  container: {
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

const message_style = StyleSheet.create({
  p: {
    marginBottom: 8,
    fontSize: 16,
  },
  blockquote: {
    marginBottom: 4,
    fontSize: 14,
    padding: 8,
    borderStyle: 'solid',
    borderWidth: 3,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  code: {
    marginBottom: 8,
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 8,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  pre: {
    marginBottom: 8,
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 8,
  },
});
