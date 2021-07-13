import Form from 'components/Form'
import { login } from 'axios/auth'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { delLoading, setLoading } from 'redux/utils'
import { setUser } from 'redux/auth'

const Login = () => {
  const dispatch = useDispatch()
  const [showpassword, setshowpassword] = useState(false)
  const [error, seterror] = useState('')
  const email = useRef('')
  const password = useRef('')

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(setLoading())
    const payload = {
      email: email.current.value,
      password: password.current.value
    }
    const response = await login(payload)
    if (response.data) dispatch(setUser(response.data))
    else seterror(response)

    dispatch(delLoading())
  }

  return (
    <Form onSubmit={onSubmit} title='Welcome back' error={error}>
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
          Login
        </button>
      </div>
    </Form>
  )
}

export default Login
