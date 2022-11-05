// Import external mdules
const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const fileUpload = require('express-fileupload')

// Import Testing connection of firestore database
const { dbPing } = require('./config/db')

// Import custom modules
const ApiError = require('./utilities/ApiError')
const apiErrorHandler = require("./middleware/apiErrorHandler")

// General App configuration settings
const config = require('./config/config')
const corsOptions = require("./config/corsOptions")

// Import central routes
const routes = require('./routes/routes')

// Import development debug tool
const debugStartup = require('debug')('app:startup');

// Initialise application using express
const app = express()

// Express middleware
// HTTP header-setter security, must above cors
app.use(helmet())

// Cross Origin resource sharing
app.use(cors(corsOptions))
debugStartup('Cors pre-flight requests enabled for whitelist origins')

// Middleware allow to parse JSON
app.use(express.json())

// Middleware allow to parse urlencoded form data
app.use(express.urlencoded({ extended: false }))
debugStartup('Parsing middleware enabled on all routes')

// File parsing middleware
app.use(fileUpload({ createParentPath: true }))

// Cycle our requests through morgan to track our queries
app.use(morgan('dev'))

// Main routes file
app.use('/api', routes())

// Not found route
app.use((req, res, next) => {
    next(ApiError.notFound())
})

// Error Handler Middleware
app.use(apiErrorHandler)

// Ping DB & Set server PORT
dbPing.then(() => {
    app.listen(
        config.port,
        () => console.log(`Server is running on port: ${config.port}`)
    )
})