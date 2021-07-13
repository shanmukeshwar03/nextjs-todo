import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: ' utils',
  initialState: {
    loading: true,
    modal: false,
    payload: undefined
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    delLoading: (state) => {
      state.loading = false
    },
    setModal: (state) => {
      state.modal = true
    },
    delModal: (state) => {
      state.modal = false
      state.payload = undefined
    },
    setPayload: (state, action) => {
      state.payload = action.payload
    },
    delPayload: (state) => {
      state.payload = undefined
    }
  }
})

export const {
  setLoading,
  delLoading,
  setModal,
  delModal,
  setPayload,
  delPayload
} = slice.actions
export default slice.reducer
