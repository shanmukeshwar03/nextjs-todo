import Form from 'components/Form'
import DatePicker from 'react-datepicker'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delLoading, delModal, setLoading } from 'redux/utils'
import { deleteTodo, patchTodo, postTodo } from 'axios/todo'
import { delTodo, setTodo, updateTodo } from 'redux/todo'

const Modal = () => {
  const dispatch = useDispatch()
  const [description, setDescription] = useState('')
  const { auth, utils } = useSelector((state) => state)
  const [date, setdate] = useState(new Date())
  const [error, seterror] = useState('')
  const [_delete, _setdelete] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()

    dispatch(setLoading())
    const payload = {
      description: description,
      date: date.toISOString()
    }

    let response
    if (utils.payload)
      if (_delete) response = await deleteTodo(utils.payload._id, auth.token)
      else
        response = await patchTodo({ ...utils.payload, ...payload }, auth.token)
    else response = await postTodo(payload, auth.token)

    if (response.data) {
      if (utils.payload) {
        if (_delete) dispatch(delTodo(utils.payload._id))
        dispatch(updateTodo({ ...utils.payload, ...payload }))
      } else dispatch(setTodo({ ...payload, _id: response.data }))
      dispatch(delModal())
    } else seterror(response)
    dispatch(delLoading())
  }

  const listener = (event) => {
    if (event.target.className === 'modal__container') dispatch(delModal())
    else if (event.key === 'Escape') dispatch(delModal())
  }

  useEffect(() => {
    document.addEventListener('keyup', listener)
    return () => document.removeEventListener('keyup', listener)
  }, [])

  useEffect(() => {
    if (utils.payload) {
      const { description, date } = utils.payload
      setDescription(description)
      setdate(new Date(date))
    }
  }, [])

  return (
    <div className='modal__container' onClick={listener}>
      <Form
        title={utils.payload ? 'Upadte Todo' : 'Create Todo'}
        onSubmit={onSubmit}
        error={error}
      >
        <label>Description</label>
        <div>
          <input
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <label>Date</label>
        <div>
          <DatePicker selected={date} onChange={(date) => setdate(date)} />
        </div>
        <div className='button__grid'>
          {utils.payload && (
            <button
              type='submit'
              id='1'
              className='button__danger'
              onClick={() => _setdelete(true)}
            >
              Delete
            </button>
          )}
          <button
            type='submit'
            id='2'
            className='button__secondary'
            onClick={() => _setdelete(false)}
          >
            {utils.payload ? 'Update' : 'Create'}
          </button>
        </div>
      </Form>
    </div>
  )
}
export default Modal
