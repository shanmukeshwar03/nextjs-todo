import axios from 'axios'
const BASE = 'https://todo.shnm.ml/'

export const getTodo = async (token) => {
  try {
    const response = await axios.get(BASE, {
      headers: { authorization: 'Bearer ' + token }
    })
    return response
  } catch (error) {
    return error.response.data
  }
}

export const postTodo = async (payload, token) => {
  try {
    const response = await axios.post(BASE, payload, {
      headers: { authorization: 'Bearer ' + token }
    })
    return response
  } catch (error) {
    return error.response.data
  }
}

export const deleteTodo = async (payload, token) => {
  try {
    const response = await axios.delete(BASE + payload, {
      headers: { authorization: 'Bearer ' + token }
    })
    return response
  } catch (error) {
    return error.response.data
  }
}

export const patchTodo = async (payload, token) => {
  try {
    const response = await axios.patch(BASE + payload._id, payload, {
      headers: { authorization: 'Bearer ' + token }
    })
    return response
  } catch (error) {
    return error.response.data
  }
}
