import { Provider } from 'react-redux'
import Appbar from 'components/Appbar'
import store from 'redux/store'
import 'react-datepicker/dist/react-datepicker.css'
import 'styles/globals.css'
import 'styles/appbar.css'
import 'styles/form.css'
import 'styles/loading.css'
import 'styles/utils.css'
import 'styles/dashboard.css'
import 'styles/modal.css'

const App = ({ Component, ...pageProps }) => {
  return (
    <Provider store={store}>
      <Appbar />
      <Component {...pageProps} />
    </Provider>
  )
}
export default App
