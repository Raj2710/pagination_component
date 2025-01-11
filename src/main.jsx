import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import ContextProvider from './utils/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ContextProvider>
      <App />
    </ContextProvider>
    <Toaster position="top-right"/>
  </>,
)
