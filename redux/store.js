import { configureStore } from '@reduxjs/toolkit'
import todo from 'redux/todo'
import auth from 'redux/auth'
import utils from 'redux/utils'

const store = configureStore({
  reducer: { todo, auth, utils }
})

store.subscribe(() => {
  if (typeof window !== 'undefined')
    localStorage.setItem('auth', JSON.stringify(store.getState().auth))
})

export default store
