import * as types from '../../actions/action-types';


export function setConversationCommentsList(data) {
  return {
    type: types.SET_CONVERSATION_COMMENTS_LIST,
    data
  };
}


export function setConversationCommentsPages(data) {
  return {
    type: types.SET_CONVERSATION_COMMENTS_PAGES,
    data
  };
}


export function setConversationCommentsCurrentPage(data) {
  return {
    type: types.SET_CONVERSATION_COMMENTS_CURRENT_PAGE,
    data
  };
}


export function setConversationTopic(data) {
  return {
    type: types.SET_CONVERSATION_TOPIC,
    data
  };
}
