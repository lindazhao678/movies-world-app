const { db } = require('../config/db')
const ApiError = require('../utilities/ApiError')
const { findUser, hashPassword, userDetailsToJSON, jwtSignUser, comparePassword } = require('../utilities/authServices')

// Import debug logs
const debugAuth = require('debug')('app:authcontroller')

module.exports = {
    // Get all users
    async listUsers(req, res, next) {
        // Store the document query in variable & call GET 
        const usersRef = db.collection('users')
        const snapshot = await usersRef.get()

        // [400 error] Check for non-existent docs
        if (snapshot.empty) {
            return next(ApiError.badRequest('The users you were looking for do not exist'))

            // Success: Push properties to array & send to client
        } else {
            let users = []
            snapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    username: doc.data().username,
                    email: doc.data().email,
                    password: doc.data().password,
                    isAdmin: doc.data().isAdmin
                })
            })
            res.send(users)
        }
    },

    // Register User
    async register(req, res, next) {
        try {
            // Deconstructing
            const { username, email, password } = req.body
            debugAuth(`Status of x-auth-token Header: ${req.headers['x-auth-token']}`)

            // Validation: block matching emails in the DB
            const userMatch = await findUser(email)
            debugAuth(userMatch)
            if (userMatch.length === 1) {
                return next(ApiError.badRequest('This email is already in use'))
            }

            // Save new user to db
            const userRef = db.collection('users')
            const response = await userRef.add({
                username: username,
                email: email,
                password: await hashPassword(password),
                isAdmin: false
            })
            debugAuth(`Success - User: ${response.id} registered!`)

            // Convert user details to JSON
            const userJSON = await userDetailsToJSON(response.id)
            debugAuth(userJSON)

            // Mint our token + return the user object as response
            res.send({
                token: jwtSignUser(userJSON)
            })

        } catch (err) {
            return next(ApiError.internal("Your user profile could not be register", err))
        }
    },

    async login(req, res, next) {
        try {
            // Deconstructing
            const { email, password } = req.body
            debugAuth(`Status of x-auth-token Header: ${req.headers['x-auth-token']}`)

            // Validation: Check for email match
            const userMatch = await findUser(email)
            debugAuth(userMatch)
            if (userMatch.length === 0) {
                return next(ApiError.badRequest('This credentials entered are not correct (DEBUG: email)'))
            }

            // Validation: Block non-matching passwords
            const passwordMatch = await comparePassword(userMatch, password)
            if (!passwordMatch) {
                return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: password)'));
            }

            // Confirm the login & convert user details to JSON
            debugAuth(`Success - User: ${userMatch[0].id} is logged in!`);
            const userJSON = await userDetailsToJSON(userMatch[0].id);

            // Return User object + token
            res.send({                
                token: jwtSignUser(userJSON)
            });

        } catch (err) {
            return next(ApiError.internal('Your user cannot be logged into at this time'.err))
        }
    }
}