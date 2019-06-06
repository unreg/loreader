import * as types from '../../actions/action-types';


const initialState = {
  FavouritesData: {
    topics: {},
    comments: {}
  }
}


const FavouritesReducer = function(state=initialState, action) {
  switch(action.type) {

    case types.SET_FAVOURITES_TOPICS:
      return Object.assign({}, state, {
        FavouritesData: Object.assign({}, state.FavouritesData, {
          topics: action.data
        })
      });

    case types.SET_FAVOURITES_COMMENTS:
      return Object.assign({}, state, {
        FavouritesData: Object.assign({}, state.FavouritesData, {
          comments: action.data
        })
      });

    default: return state;
  }
}


export default FavouritesReducer;
