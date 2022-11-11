// Import React modules
import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Import components
import Layout from './components/layout/Layout'

// Hooks & Services
import PrivateRoutes from './components/layout/PrivateRoutes';

// Import pages
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Auth/Dashboard'
import AllDVDs from './pages/DVD/AllDVDs'
import Details from './pages/DVD/Details'
import AddDVD from './pages/DVD/AddDVD'
import EditDVD from './pages/DVD/EditDVD'
import SearchDVD from './pages/DVD/SearchDVD'
import About from './pages/About'
import PageNotFound from './pages/PageNotFound'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>

        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/dvd" element={<AllDVDs />} />
        <Route path="/dvd/:id" element={<Details />} />
        <Route path="/dvd/add" element={<AddDVD />} />
        <Route path="/dvd/edit/:id" element={<EditDVD />} />
        <Route path="/dvd/search" element={<SearchDVD />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

export default App
