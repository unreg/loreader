import * as types from '../../actions/action-types';


const initialState = {
  ForumsData: {
    items: [],
  }
}


const ForumsReducer = function(state=initialState, action) {
  switch(action.type) {

    case types.SET_FORUMS_LIST:
      return Object.assign({}, state, {
        ForumsData: Object.assign({}, state.ForumsData, {
          items: action.data
        })
      });

    default: return state;
  }
}


export default ForumsReducer;
