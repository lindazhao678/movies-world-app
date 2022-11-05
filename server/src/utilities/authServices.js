const { db } = require('../config/db')
const config = require('../config/config')

// Import modules
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

module.exports = {
    async findUser(email) {
        const usersRef = db.collection('users')
        const snapshot = await usersRef.get()

        // Push each user doc into users array
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

        // Search for the email argument passed into the function
        const userMatch = users.filter(user => email === user.email)
        return userMatch
    },

    // Salt and hash the plain password send by the user
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    },

    // Compare the password of the userMatch in the db and the password that send by the user
    async comparePassword(user, password) {
        const hashPassword = user[0].password

        // Compare form password vs hashed db password
        const passwordMatch = await bcrypt.compare(
            password,
            hashPassword
        )
        return passwordMatch
    },

    // get the user object by id, omit the password, and convert to the user JSON data. 
    async userDetailsToJSON(id) {
        // Call newly Registered User
        const userRef = db.collection('users')
        const user = await userRef.doc(id).get()

        // Convert Data to JSON (except password)
        const userJSON = _.omit(
            { id: id, ...user.data() },
            'password'
        )
        return userJSON
    },

    // Take the user object and mint the token
    jwtSignUser(user) {
        // Declare variables for the token generation
        const payload = user
        const secret = config.authentication.jwtSecret
        const tokenExpireTime = 60 * 60 * 24

        // Generate/mint token
        const token = jwt.sign(
            payload,
            secret,
            { expiresIn: tokenExpireTime }
        );
        return token;
    }
}