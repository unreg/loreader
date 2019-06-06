import * as types from '../../actions/action-types';


export function setForumsList(data) {
  return {
    type: types.SET_FORUMS_LIST,
    data
  };
}
