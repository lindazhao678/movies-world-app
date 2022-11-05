// CUSTOM ERROR UTILITY CLASS
// Import development debug tool
const debugError500 = require('debug')('app:error500')

class ApiError {
    // Constructor & properties
    constructor(code, message, err) {
        this.code = code
        this.message = message
        this.err = err
    }

    // Class methods: Custom functions for each type of error 
    // [400] Bad request - user error
    static badRequest(msg) {
        return new ApiError(400, `Bad Request: ${msg}`)
    }

    // [403] Forbidden
    static forbidden(msg) {
        return new ApiError(403, `Forbidden: ${msg}`)
    }

    // [404] Not found
    static notFound() {
        return new ApiError(404, 'Resource Not Found')
    }

    // [413] Entity Too Large
    static tooLarge(msg) {
        return new ApiError(413, `Upload Failed: ${msg}`);
    }

    // [422] Unprocessable Entity
    static cannotProcess(msg) {
        return new ApiError(422, `Upload Failed: ${msg}`);
    }

    // [500] Internal server error
    static internal(msg, err) {
        debugError500(err)
        return new ApiError(500, `Internal Servre Errer: ${msg}`)
    }
}

module.exports = ApiError