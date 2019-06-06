import * as types from '../../actions/action-types';


const initialState = {
  LastTopicsData: {
    forum: {},
    items: []
  }
}


const LastTopicsReducer = function(state=initialState, action) {
  switch(action.type) {

    case types.SET_LAST_TOPICS_FORUM:
      return Object.assign({}, state, {
        LastTopicsData: Object.assign({}, state.LastTopicsData, {
          forum: action.data
        })
      });

    case types.SET_LAST_TOPICS_LIST:
      return Object.assign({}, state, {
        LastTopicsData: Object.assign({}, state.LastTopicsData, {
          items: action.data
        })
      });

    default: return state;
  }
}


export default LastTopicsReducer;
