//ERROR HANDLING MIDDLEWARE
//All errors to be passed to this middleware & issue response
const ApiError = require('../utilities/ApiError')

const apiErrorHandler = (err, req, res, next) => {
    // Middleware Checks if the Error is one of our Pre-Defined Methods ("instanceof")
    // Error = pre-defined Error Class Methods
    if (err instanceof ApiError) {
        res.status(err.code).json(err.message)
        return

        // Error "Catch rest of all"    
    } else {
        console.log(err)
        res.status(500).json({
            message: "Oops! Something went wrong - please try again later"
        })
    }
}

module.exports = apiErrorHandler