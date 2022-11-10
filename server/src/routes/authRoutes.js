// Import express and router
const express = require('express')
const router = express.Router()

// Import auth module
const RegisterPolicy = require('../policies/RegisterPolicy')
const LoginPolicy = require('../policies/LoginPolicy')
const AuthController = require("../controllers/authController")

// Setup routes
module.exports = () => {
    // AUTH: TEST Route (GET ALL) Route
    router.get('/users',
        AuthController.listUsers
    )

    // AUTH: Register (POST) Route
    router.post('/register',
        RegisterPolicy.validateRegister,
        AuthController.register
    )

    // AUTH: Login (POST) Route
    router.post('/login',
        LoginPolicy.validateLogin,
        AuthController.login
    )
    return router
} 