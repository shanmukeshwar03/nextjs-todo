import { createSlice } from '@reduxjs/toolkit'

let initialState = { token: undefined, user: undefined }

if (typeof window !== 'undefined') {
  const auth = JSON.parse(localStorage.getItem('auth'))
  if (auth) initialState = auth
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    delUser: (state) => {
      state.token = undefined
      state.user = undefined
    }
  }
})

export const { setUser, delUser } = slice.actions
export default slice.reducer
