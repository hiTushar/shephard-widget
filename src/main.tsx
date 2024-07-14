import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

let widgetDivs = document.querySelectorAll('.center-widget');

widgetDivs.forEach((div) => {
  ReactDOM.createRoot(div!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
