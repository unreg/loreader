import * as types from '../../actions/action-types';


const initialState = {
  ConversationData: {
    topic: {},
    items: [],
    pages: ['last'],
    current_page: 'last'
  }
}


const ConversationReducer = function(state=initialState, action) {
  switch(action.type) {

    case types.SET_CONVERSATION_COMMENTS_LIST:
      return Object.assign({}, state, {
        ConversationData: Object.assign({}, state.ConversationData, {
          items: action.data
        })
      });

    case types.SET_CONVERSATION_COMMENTS_PAGES:
      return Object.assign({}, state, {
        ConversationData: Object.assign({}, state.ConversationData, {
          pages: action.data
        })
      });

    case types.SET_CONVERSATION_COMMENTS_CURRENT_PAGE:
      return Object.assign({}, state, {
        ConversationData: Object.assign({}, state.ConversationData, {
          current_page: action.data
        })
      });

    case types.SET_CONVERSATION_TOPIC:
      return Object.assign({}, state, {
        ConversationData: Object.assign({}, state.ConversationData, {
          topic: action.data
        })
      });
    default: return state;
  }
}


export default ConversationReducer;
