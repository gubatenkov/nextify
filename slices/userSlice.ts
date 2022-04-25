import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '../interfacesAndTypes'

type IState = IUser | null

const initialState: IState = null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: IState, { payload }) => payload,
    clearUser: (state: IState) => null,
  },
})

export const { setUser, clearUser } = slice.actions

export default slice.reducer
