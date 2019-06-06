import * as types from './actions/action-types';

export function setAppDarkTheme(data) {
  return {
    type: types.SET_APP_DARK_THEME,
    data
  };
}
