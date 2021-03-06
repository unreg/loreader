import React, {Component} from 'react';
import { connect } from 'react-redux';

import { ScrollView, View, StyleSheet } from "react-native";
import { withTheme, Colors } from 'react-native-paper';

import { Appbar, List, Text } from "react-native-paper";

import { strings } from '../../i18n';

import Divider from '../../components/divider/container';
import ListCheckboxItem from '../../components/settings/checkbox';

import { store } from '../../store';
import { setAppDarkTheme, setAppAutoScroll } from '../../actions';

import createReactContext from 'create-react-context';


const PreferencesContext: any = createReactContext();


class SettingsScreen extends React.Component {

  render() {
    // console.log(this.props.data);

    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    const { isDarkTheme, autoScroll } = this.props.data;

    return (
      <View style={[styles.container]}>
        <Appbar.Header theme={this.props.theme}>
          <Appbar.Action icon="settings" />
          <Appbar.Content
            title={strings('screen_title.settings')}
          />
        </Appbar.Header>

        <ScrollView>
          <List.Section>
            <ListCheckboxItem
              disabled={false}
              title={'Тёмная тема'}
              description={isDarkTheme && 'Установлена' || 'Установить тёмную тему'}
              value={isDarkTheme}
              onPress={() => {if (this.props.data.toggleTheme) {this.props.data.toggleTheme()} store.dispatch(setAppDarkTheme(!isDarkTheme))}} />
            <Divider />
          </List.Section>
          <List.Section>
            <ListCheckboxItem
              disabled={false}
              title={'Переход к прочитанному'}
              description={autoScroll && 'Включен' || 'Включить'}
              value={autoScroll}
              onPress={() => {store.dispatch(setAppAutoScroll(!autoScroll))}} />
            <Divider />
          </List.Section>
          <List.Section>
            <List.Item
              title={'Версия приложения'} description={'Version 0.1.0'}
            />
            <Divider />
          </List.Section>
        </ScrollView>
      </View>
    );
  }
}

const mapStateProps = store => ({
  data: store.AppState.AppData,
});

export default connect(mapStateProps)(withTheme(SettingsScreen));


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
