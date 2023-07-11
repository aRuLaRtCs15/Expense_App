import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import configureStore from './store/configStore';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

const store = configureStore()
console.log('initial', store.getState())

store.subscribe(() => {
  console.log('update', store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
