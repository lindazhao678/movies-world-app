const Joi = require('joi')
const ApiError = require('../utilities/ApiError')
const debugJoi = require('debug')('app:joi')

module.exports = {
    // Joi validation function/schema
    validateMovie(req, res, next) {
        debugJoi(req.body)
        const schema = Joi.object({
            title: Joi.string().min(3).max(50).required(),
            genre: Joi.string().min(3).max(50).required(),
            rate: Joi.number().positive().min(1).max(10).required(),
            stock: Joi.number().positive().min(1).max(100).required(),
            image: Joi.any(),
            uploadedFile: Joi.string()
        })

        // Call the function & pass in the request data (req.body)
        const { error } = schema.validate(req.body)

        // Run the output of the function against test cases
        if (error) {
            debugJoi(error)
            switch (error.details[0].context.key) {
                case 'title':
                    next(ApiError.badRequest('You must provide a valid movie title'))
                    break

                case 'genre':
                    next(ApiError.badRequest('You must select a movie genre'))
                    break

                case 'rate':
                    next(ApiError.badRequest('You must provide a number'))
                    break

                case 'stock':
                    next(ApiError.badRequest('You must provide a number'))
                    break

                case 'image':
                case 'filePath':
                    next(ApiError.badRequest('You must provide a valid image'))
                    break

                default:
                    next(ApiError.badRequest('Invalid Form Invalid - please check form information and submit again'))
            }
        } else {
            next()
        }
    }
}