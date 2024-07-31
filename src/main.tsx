import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

let widgetDivs = document.querySelectorAll('.center-widget');

widgetDivs.forEach((div) => {
  ReactDOM.createRoot(div!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
})
