import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The built page arrives prerendered; the dev server's doesn't
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
