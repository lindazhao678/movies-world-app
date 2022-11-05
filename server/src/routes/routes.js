// CENTRAL ROUTE FILE
// Import express and router
const express = require('express')
const router = express.Router()

// Import sub-routes
const authRoutes = require('./authRoutes')
const movieRoutes = require('./movieRoutes')

// Import sub-routes
module.exports = () => {
    // HOME: Test GET Route
    router.get('/', (req, res, next) => {
        res.send('Hello World')
    })

    // Sub-Routes
    router.use('/auth', authRoutes())
    router.use('/movie', movieRoutes())
    
    return router
}