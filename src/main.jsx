import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import EditorContextProvider from './context/editor-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditorContextProvider>
      <App />
    </EditorContextProvider>
  </StrictMode>,
)
