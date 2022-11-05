// Import express and router
const express = require('express')
const router = express.Router()

// Import auth module
const AuthPolicy = require('../policies/authPolicy')
const AuthController = require("../controllers/authController")

// Setup routes
module.exports = () => {
    // AUTH: TEST Route (GET ALL) Route
    router.get('/users',
        AuthController.listUsers
    )

    // AUTH: Register (POST) Route
    router.post('/register',
        AuthPolicy.validateAuth,
        AuthController.register
    )

    // AUTH: Login (POST) Route
    router.post('/login',
        AuthPolicy.validateAuth,
        AuthController.login
    )
    return router
} 