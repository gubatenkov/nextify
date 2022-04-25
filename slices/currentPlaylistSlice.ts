import { createSlice } from '@reduxjs/toolkit'
import { IPlaylist, ITrack } from '../interfacesAndTypes'

type IState = {
  currentPlaylistId: null | string
  currentPlaylist: null | IPlaylist
  // currentTrackId: null | string
  currentTrack: null | ITrack
}

interface ISetPlaylistIdAction {
  type: string
  payload: string
}

interface ISetPlaylistAction {
  type: string
  payload: IPlaylist
}

interface ISetTrackIdAction {
  type: string
  payload: string
}

interface ISetTrackAction {
  type: string
  payload: ITrack
}

const initialState: IState = {
  currentPlaylistId: null,
  currentPlaylist: null,
  // currentTrackId: null,
  currentTrack: null,
}

const slice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setCurrentPlaylistId: (
      state: IState,
      { payload }: ISetPlaylistIdAction
    ) => {
      state.currentPlaylistId = payload
    },
    setCurrentPlaylist: (state: IState, { payload }: ISetPlaylistAction) => {
      state.currentPlaylist = payload
    },
    // setCurrentTrackId: (state: IState, { payload }: ISetTrackIdAction) => {
    //   state.currentTrackId = payload
    // },
    setCurrentTrack: (state: IState, { payload }: ISetTrackAction) => {
      state.currentTrack = payload
    },
  },
})

export const {
  setCurrentPlaylistId,
  setCurrentPlaylist,
  // setCurrentTrackId,
  setCurrentTrack,
} = slice.actions

export default slice.reducer
