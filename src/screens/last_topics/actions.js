import * as types from '../../actions/action-types';


export function setLastTopicsForum(data) {
  return {
    type: types.SET_LAST_TOPICS_FORUM,
    data
  };
}


export function setLastTopicsList(data) {
  return {
    type: types.SET_LAST_TOPICS_LIST,
    data
  };
}
