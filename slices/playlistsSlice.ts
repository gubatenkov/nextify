import { createSlice } from '@reduxjs/toolkit'
import { IPlaylist } from '../interfacesAndTypes'

type IState = IPlaylist[] | []

interface ISetPlaylistsAction {
  type: string
  payload: IPlaylist[]
}

const initialState: IState = []

const slice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists: (state: IState, { payload }: ISetPlaylistsAction) => payload,
    clearPlaylists: () => [],
  },
})

export const { setPlaylists, clearPlaylists } = slice.actions

export default slice.reducer
