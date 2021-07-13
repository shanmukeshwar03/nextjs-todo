import Form from 'components/Form'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading, delLoading } from 'redux/utils'
import { register } from 'axios/auth'
import { setUser } from 'redux/auth'

const Register = () => {
  const dispatch = useDispatch()
  const [showpassword, setshowpassword] = useState(false)
  const [error, seterror] = useState('')
  const username = useRef('')
  const email = useRef('')
  const password = useRef('')

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(setLoading())
    const payload = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value
    }
    const response = await register(payload)
    if (response.data) dispatch(setUser(response.data))
    else seterror(response)

    dispatch(delLoading())
  }

  return (
    <Form onSubmit={onSubmit} title='Join us' error={error}>
      <label>Username</label>
      <div>
        <input required ref={username} />
      </div>
      <label>Email</label>
      <div>
        <input type='email' required ref={email} />
      </div>
      <label>Password</label>
      <div>
        <input
          type={showpassword ? 'text' : 'password'}
          required
          ref={password}
        />
        <img
          onClick={() => setshowpassword(!showpassword)}
          src={showpassword ? '/icons/eye-close.svg' : '/icons/eye-open.svg'}
        />
      </div>
      <div className='button__grid'>
        <button type='submit' className='button__secondary'>
          Register
        </button>
      </div>
    </Form>
  )
}
export default Register
