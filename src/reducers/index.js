import { combineReducers } from 'redux';

import AppReducer from '../reducer';

import TrackerReducer from '../screens/tracker/reducer';
import ConversationReducer from '../screens/conversation/reducer';
import FavouritesReducer from '../screens/favourites/reducer';
import ForumsReducer from '../screens/forums/reducer';
import LastTopicsReducer from '../screens/last_topics/reducer';


var reducers = combineReducers({
  AppState: AppReducer,

  TrackerState: TrackerReducer,
  ConversationState: ConversationReducer,
  FavouritesState: FavouritesReducer,
  ForumsState: ForumsReducer,
  LastTopicsState: LastTopicsReducer,
})


export default reducers;
