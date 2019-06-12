import * as types from './actions/action-types';


const initialState = {
  AppData: {
    isDarkTheme: true,
    autoScroll: false,
    toggleTheme: () => {}
  }
}


const AppReducer = function(state=initialState, action) {
  switch(action.type) {

    case types.SET_APP_DARK_THEME:
      return Object.assign({}, state, {
        AppData: Object.assign({}, state.AppData, {
          isDarkTheme: action.data
        })
      });

    case types.SET_APP_TOGGLE_THEME:
      return Object.assign({}, state, {
        AppData: Object.assign({}, state.AppData, {
          toggleTheme: action.data
        })
      });

    case types.SET_APP_AUTO_SCROLL:
      return Object.assign({}, state, {
        AppData: Object.assign({}, state.AppData, {
          autoScroll: action.data
        })
      });

    default: return state;
  }
}


export default AppReducer;
