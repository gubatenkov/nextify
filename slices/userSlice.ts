import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '../interfacesAndTypes'

type IState = null | IUser

const initialState: IState = null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => payload,
    clearUser: () => null,
  },
})

export const { setUser, clearUser } = slice.actions

export default slice.reducer
