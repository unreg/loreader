import * as types from '../../actions/action-types';


export function setFavouritesTopics(data) {
  return {
    type: types.SET_FAVOURITES_TOPICS,
    data
  };
}


export function setFavouritesComments(data) {
  return {
    type: types.SET_FAVOURITES_COMMENTS,
    data
  };
}
