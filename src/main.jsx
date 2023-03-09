import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './context/languageContext'
import { UserProvider } from './context/userContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    < UserProvider>
        < LanguageProvider>
            <App />
        </LanguageProvider>
    </UserProvider>
)
