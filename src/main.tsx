import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from './lib/store'
import './styles.css'

try {
  const githubPagesPath = sessionStorage.getItem('lasya-gh-pages-redirect')
  if (githubPagesPath) {
    sessionStorage.removeItem('lasya-gh-pages-redirect')
    window.history.replaceState(null, '', githubPagesPath)
  }
} catch {
  // Routing falls back to the site root when browser storage is unavailable.
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
)