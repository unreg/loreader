import * as types from './actions/action-types';


const initialState = {
  AppData: {
    isDarkTheme: true
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

    default: return state;
  }
}


export default AppReducer;
