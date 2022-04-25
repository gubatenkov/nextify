import storage from 'redux-persist/lib/storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import {
  modalsReducer,
  userReducer,
  playlistsReducer,
  currentPlaylistSlice,
} from '../slices'
import { trackApi } from '../palylistAPI/trackApi'
import { playlistsApi } from '../palylistAPI/playlistsApi'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [playlistsApi.reducerPath],
}

const rootReducer = combineReducers({
  [playlistsApi.reducerPath]: playlistsApi.reducer,
  [trackApi.reducerPath]: trackApi.reducer,
  user: userReducer,
  playlists: playlistsReducer,
  current: currentPlaylistSlice,
  modals: modalsReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(playlistsApi.middleware, trackApi.middleware),
})

export let persistor = persistStore(store)
export default store
