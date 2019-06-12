import * as types from '../../actions/action-types';


const initialState = {
  ConversationData: {
    topic: {},
    visited: {}
  }
}


const ConversationReducer = function(state=initialState, action) {
  switch(action.type) {

    case types.SET_CONVERSATION_TOPIC:
      return Object.assign({}, state, {
        ConversationData: Object.assign({}, state.ConversationData, {
          topic: action.data
        })
      });

    case types.SET_CONVERSATION_VISITED:
      return Object.assign({}, state, {
        ConversationData: Object.assign({}, state.ConversationData, {
          visited: action.data
        })
      });

    default: return state;
  }
}


export default ConversationReducer;
