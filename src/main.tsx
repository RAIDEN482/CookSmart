import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Navbar } from './components/layout/Navbar'
import { HomePage } from './pages/HomePage'
import { ResultsPage } from './pages/ResultsPage'
import { RecipeDetailPage } from './pages/RecipeDetailPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col bg-bg">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<HomePage />} />
            <Route path="/results"   element={<ResultsPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW registration failed — app still works, just no offline support
    })
  })
}
