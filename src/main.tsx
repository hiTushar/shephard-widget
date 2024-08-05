import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.tsx'
import './index.css'
import store from './redux/store.tsx';

let widgetDivs = document.querySelectorAll('.center-widget');

widgetDivs.forEach((div) => {
  ReactDOM.createRoot(div!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
})
