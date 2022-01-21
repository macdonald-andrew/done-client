import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import App from './containers/App'
import { configureStore, history } from './store'
import reportWebVitals from './reportWebVitals'
import './assets/fonts/Inter/Inter-VariableFont.ttf'
import './index.css'

export const store = configureStore()

const render = Component => {
  return ReactDOM.render(
    <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render(App)

// hot reloading
// https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    render(NextApp)
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()