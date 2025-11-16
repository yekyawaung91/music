import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/600.css";
import './index.css'
import App from './App.tsx'

// ✔ Universal PWA register (works in all Vite setups)
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
