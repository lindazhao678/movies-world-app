const { db } = require('../config/db')
const ApiError = require('../utilities/ApiError')
const { storageBucketUpload, deleteFileFromBucket, getFileFromUrl } = require('../utilities/bucketServices')

// Import debug logs
const debugWrite = require('debug')('app:write')
const debugRead = require('debug')('app:read')

module.exports = {
    // Get all movies
    async getAllMovies(req, res, next) {
        try {
            // Store the document query in variable & call GET 
            const movieRef = db.collection('movies')
            const snapshot = await movieRef.orderBy(req.query.sortName, req.query.sortOrder)
                .get()

            // [400 error] Check for non-existent docs
            if (snapshot.empty) {
                return next(ApiError.badRequest('The movies you were looking for do not exist'))

                // Success: push properties to array & send to client
            } else {
                let movies = []
                snapshot.forEach(doc => {
                    movies.push({
                        id: doc.id,
                        title: doc.data().title,
                        genre: doc.data().genre,
                        rate: doc.data().rate,
                        stock: doc.data().stock,
                        image: doc.data().image
                    })
                })
                res.send(movies)
            }
        } catch (err) {
            return next(ApiError.internal("The movies could not be retrieved", err))
        }
    },

    // Search movies
    async searchMovies(req, res, next) {
        try {
            // Store the document query in variable
            const movieRef = db.collection('movies')

            // search movies whose title starts with the search keywords. the results is sorted by the title & stock
            // const snapshot = await movieRef
            //     .where("title", ">=", "a")
            //     .where('title', '<=', "a" + '\uf8ff')
            //     .orderBy("title", "asc")
            //     .orderBy("stock", "asc")
            //     .get()

            // Search movies whose title starts with the search keywords. The results is sorted by the title & rate
            const snapshot = await movieRef
                .where("title", ">=", `${req.query.title}`)
                .where('title', '<=', `${req.query.title}` + '\uf8ff')
                .orderBy("title", "asc")
                .orderBy("rate", "desc")
                .get()

            // [400 error] Check for non-existent docs
            if (snapshot.empty) {
                return next(ApiError.badRequest('The movies you were looking for do not exist'))

                // Success: push properties to array & send to client
            } else {
                let movies = []
                snapshot.forEach(doc => {
                    movies.push({
                        id: doc.id,
                        title: doc.data().title,
                        genre: doc.data().genre,
                        rate: doc.data().rate,
                        stock: doc.data().stock,
                        image: doc.data().image
                    })
                })
                res.send(movies)
            }
        } catch (err) {
            return next(ApiError.internal("The movie could not be retrieved", err))
        }
    },

    // Add movie
    async addMovie(req, res, next) {
        // Testing data posted to server
        debugWrite(req.params)
        debugWrite(req.body)
        debugWrite(req.files)
        debugWrite(req.locals)

        // File upload to storage bucket
        let downloadURL = null
        try {
            const filename = res.locals.filename
            downloadURL = await storageBucketUpload(filename);

        } catch (err) {
            return next(ApiError.internal("Your request could not be processed", err))
        }

        try {
            const movieRef = db.collection('movies')
            const response = await movieRef.add({
                title: req.body.title,
                genre: req.body.genre,
                rate: Number(req.body.rate),
                stock: Number(req.body.stock),
                image: downloadURL
            })
            console.log(`Added movie with ID: ${response.id}`)
            res.send(response.id)
        } catch (err) {
            return next(ApiError.internal("Your request could not be saved at this time", err))
        }
    },

    // Get movie by id
    async getMovieById(req, res, next) {
        // Test: Check ID passed via URL query string parameters
        debugRead(req.params);

        try {
            // Store the movie document query in variable & call GET method for ID
            const movieRef = db.collection('movies').doc(req.params.id);
            const doc = await movieRef.get();

            // [400 ERROR] Check for User Asking for Non-Existent Documents
            if (!doc.exists) {
                return next(ApiError.badRequest('The movie you were looking for does not exist'));

                // SUCCESS: Send back the specific document's data
            } else {
                res.send(doc.data());
            }

            // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
        } catch (err) {
            return next(ApiError.internal('Your request could not be processed at this time', err));
        }
    },

    // Update movie
    async updateMovieById(req, res, next) {
        // Testing data posted to server
        debugWrite(req.body)
        debugWrite(req.files)
        debugWrite(req.locals)

        let downloadURL = null
        try {
            if (req.files) {
                // Standard Cloud Storage-Upload
                const filename = res.locals.filename
                downloadURL = await storageBucketUpload(filename)

                // Delete OLD image version in Storage Bucket, if it exists
                if (req.body.uploadedFile) {
                    debugWrite(`Deleting old image in storage: ${req.body.uploadedFile}`);
                    const bucketResponse = await deleteFileFromBucket(req.body.uploadedFile);
                }

                // IMAGE NOT CHANGED: We just pass back the current downloadURL and pass that back to the database, unchanged!
            } else if (req.body.image) {
                console.log(`No change to image in DB`);
                downloadURL = req.body.image;

            } else {
                return next(ApiError.badRequest('The file you are trying to upload cannot be edited at this time'));
            }

            // [500 ERROR] Checks for Errors in our File Upload
        } catch (err) {
            return next(ApiError.internal("Your request could not be processed at this time", err))
        }

        try {
            const movieRef = db.collection('movies').doc(req.params.id);
            const response = await movieRef.update({
                title: req.body.title,
                genre: req.body.genre,
                rate: Number(req.body.rate),
                stock: Number(req.body.stock),
                image: downloadURL
            })
            res.send(response)
        } catch (err) {
            return next(ApiError.internal("Your request could not be saved at this time", err))
        }
    },

    // Delete movie
    async deleteMovieById(req, res, next) {
        debugWrite(req.params);
        // Delete document image file from storage 
        try {
            // Store the movie document query in variable & call GET method for ID
            const movieRef = db.collection('movies').doc(req.params.id);
            const doc = await movieRef.get();

            // [400 ERROR] Check for User Asking for Non-Existent Documents
            if (!doc.exists) {
                return next(ApiError.badRequest('The movie you were looking for does not exist'));
            }

            // Store downloadURL and obtain uploadedFile in storage bucket
            const downloadURL = doc.data().image;
            const uploadedFile = getFileFromUrl(downloadURL);

            // Call storage bucket delete function & delete previously uploadedFile
            const bucketResponse = await deleteFileFromBucket(uploadedFile);

            // Delete document from Cloud Firestore
            if (bucketResponse) {
                // Call DELETE method for ID (with PRECONDITION parameter to check document exists)
                const response = await movieRef.delete({ exists: true });

                // SUCCESS: Issue back response for timebeing
                res.send(response);
            }

            // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
        } catch (err) {
            return next(ApiError.internal('Your request could not be saved at this time', err));
        }
    }
}