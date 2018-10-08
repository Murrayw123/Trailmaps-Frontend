import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import dataReducer from './redux/reducers'
import thunk from 'redux-thunk'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import '../node_modules/antd/dist/antd.css'
import './css/App.css'
import './css/Menu.css'
import './css/MapComponent.css'

const store = createStore(dataReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
