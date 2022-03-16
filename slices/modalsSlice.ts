import { createSlice } from '@reduxjs/toolkit'

interface InitState {
  userWidgetModal: boolean
}

const initialState: InitState = {
  userWidgetModal: false,
}

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openUserWidgetModal: (state: InitState) => {
      state.userWidgetModal = true
    },
    closeUserWidgetModal: (state: InitState) => {
      state.userWidgetModal = false
    },
  },
})

// action creators are generated for each case reducer function
export const { openUserWidgetModal, closeUserWidgetModal } = slice.actions

export default slice.reducer
