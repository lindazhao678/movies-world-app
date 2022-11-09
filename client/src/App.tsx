// Import React modules
import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

// Import components
import Layout from './components/layout/Layout'

// Hooks & Services

// Import pages
import Home from './pages/Home'

const App: FC = () => {
  return (
    <Routes>
      {/* Main layout wrapper & routed children */}
      <Route path="/" element={<Layout />}>
        {/* Root pages */}
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
