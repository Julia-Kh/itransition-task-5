import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { SettingsProvider } from './components/SettingsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <SettingsProvider>
    <App />
  </SettingsProvider>
  // </React.StrictMode>
  ,
)
