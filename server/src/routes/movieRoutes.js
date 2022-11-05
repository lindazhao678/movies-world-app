// Import express and router
const express = require('express')
const router = express.Router()

// Import movie module
const movieController = require('../controllers/movieController')
const moviePolicy = require('../policies/moviePolicy')
const filePolicy = require('../policies/filePolicy');
const fileServerUpload = require('../middleware/fileServerUpload');

// Setup routes
module.exports = () => {
    // Get all movies route
    router.get('/',
        fileServerUpload,
        movieController.getAllMovies
    )

    // Search route
    router.get('/searches',
        movieController.searchMovies
    )

    // Post Route
    router.post('/',
        [moviePolicy.validateMovie,
        filePolicy.filesPayloadExists,
        filePolicy.fileSizeLimiter,
        filePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
            fileServerUpload],
        movieController.addMovie
    )

    // Get by id route
    router.get('/:id',
        movieController.getMovieById
    )

    // Update route
    router.put('/:id',
        [moviePolicy.validateMovie,
        filePolicy.filesPayloadExists,
        filePolicy.fileSizeLimiter,
        filePolicy.fileExtLimiter(['.png', '.jpg', '.jpeg', '.gif']),
            fileServerUpload],
        movieController.updateMovieById
    )

    // Delete route
    router.delete('/:id',
        movieController.deleteMovieById)

    return router
}