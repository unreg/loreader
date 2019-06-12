import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import reducers from './reducers';


const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel1
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer);
// export const persistor = persistStore(store, null, () => {console.log('Rehydrated')});
export const persistor = persistStore(store);
