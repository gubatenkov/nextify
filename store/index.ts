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
import storage from 'redux-persist/lib/storage'
import { playlistsApi } from '../api/playlistsApi'
import { modalsReducer, userReducer, playlistsReducer } from '../slices'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [playlistsApi.reducerPath],
}

const rootReducer = combineReducers({
  [playlistsApi.reducerPath]: playlistsApi.reducer,
  user: userReducer,
  playlists: playlistsReducer,
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
    }).concat(playlistsApi.middleware),
})

export let persistor = persistStore(store)
export default store
