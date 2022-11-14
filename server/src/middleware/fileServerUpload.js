const ApiError = require('../utilities/ApiError')
const path = require('path')
const debugFile = require('debug')('app:file')

const fileServerUpload = (req, res, next) => {
    if (req.files) {
        // 1. Store file
        const file = req.files.image
        debugFile(`Image for server processing: ${file.name}`)

        // 2. Append unique filename extension
        const filename = Date.now() + '_' + file.name
        debugFile(`Unique filename: ${filename}`)

        // 3. Declare server storage directory path
        const uploadPath = path.join(
            __dirname,
            '../../public/uploads/',
            filename
        )

        // 4. Move file to server storage
        file
            .mv(uploadPath)
            .then(() => {
                // Store unique filename in res.locals object & pass to next middleware
                console.log(`Server Upload Successful: ${uploadPath}`)
                res.locals.filename = filename
                next()
            })
            .catch(err => {
                if (err) return next(ApiError.internal('Your file request could not be processed at this time', err))
            })
    } else {
        next()
    }
}

module.exports = fileServerUpload