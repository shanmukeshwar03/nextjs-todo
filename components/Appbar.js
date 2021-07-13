import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { delUser } from 'redux/auth'
import { delLoading, setLoading, setModal } from 'redux/utils'
import Loading from 'components/Loading'

const Appbar = () => {
  const { auth, utils } = useSelector((state) => state)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => dispatch(setLoading())
    const handleComplete = () => dispatch(delLoading())

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
    }
  }, [])

  useEffect(() => {
    if (auth.token) router.replace('/dashboard')
    else router.replace('/login')
  }, [auth.token])

  const handleClick = (event) => {
    switch (event.target.id) {
      case '1':
        dispatch(setModal())
        break
      case '2':
        dispatch(delUser())
        break
      case '3':
        router.push('/login')
        break
      case '4':
        router.push('/register')
        break

      default:
        break
    }
  }

  if (utils.loading) return <Loading />

  return (
    <div className='appbar__container'>
      <h1>Todo List</h1>
      <div>
        {auth.token ? (
          <div>
            <button className='button__primary' id='1' onClick={handleClick}>
              Create
            </button>
            <button className='button__primary' id='2' onClick={handleClick}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {router.pathname === '/register' ? (
              <button className='button__primary' id='3' onClick={handleClick}>
                Login
              </button>
            ) : (
              <button className='button__primary' id='4' onClick={handleClick}>
                Register
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default Appbar
