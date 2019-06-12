import * as types from '../../actions/action-types';


export function setConversationTopic(data) {
  return {
    type: types.SET_CONVERSATION_TOPIC,
    data
  };
}


export function setConversationVisited(data) {
  return {
    type: types.SET_CONVERSATION_VISITED,
    data
  };
}
