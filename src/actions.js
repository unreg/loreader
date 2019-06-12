import * as types from './actions/action-types';


export function setAppDarkTheme(data) {
  return {
    type: types.SET_APP_DARK_THEME,
    data
  };
}


export function setAppAutoScroll(data) {
  return {
    type: types.SET_APP_AUTO_SCROLL,
    data
  };
}


export function setAppToggleTheme(data) {
  return {
    type: types.SET_APP_TOGGLE_THEME,
    data
  };
}
