const Joi = require('joi')
const ApiError = require('../utilities/ApiError')
const debugJoi = require('debug')('app:joi')

module.exports = {
    // Joi validation function/schema
    validateAuth(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'au'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            isAdmin: Joi.boolean()
        })

        // Call the function schema & pass in the request data (req.body)
        const { error } = schema.validate(req.body)

        // Run the output of the function against test cases
        if (error) {
            debugJoi(error)
            switch (error.details[0].context.key) {
                case 'username':
                    next(ApiError.badRequest('You must provide a valid username'))
                    break

                case 'email':
                    next(ApiError.badRequest('You must provide a valid email'))
                    break

                case 'password':
                    next(ApiError.badRequest('You must provide a valid password'))
                    break

                default:
                    next(ApiError.badRequest('Invalid Form Invalid - please check form information and submit again'))
            }
        } else {
            next()
        }
    }
}