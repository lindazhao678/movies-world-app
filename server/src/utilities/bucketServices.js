const { bucket } = require('../config/db')
const fs = require('fs')
const uuid = require('uuid')
const debugBucket = require('debug')('app:bucket')
const config = require('../config/config')

module.exports = {
    async storageBucketUpload(filename) {
        // 1. Generate random uuid storge token
        debugBucket(`Firestore filename: ${filename}`)
        const storageToken = uuid.v4()

        // 2. Declare file path & options parameter varibles for uploads
        const serverFilePath = `./public/uploads/${filename}`
        const options = {
            destination: filename,
            resumable: true,
            validation: 'crc32c',
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: storageToken
                },
            }
        }

        // OPTIONAL DEBUGGING: Checks if server-side /uploads file exists before BUCKET UPLOAD
        // fs.access(serverFilePath, fs.F_OK, (err) => {
        //     if (err) {
        //         debugBucket(err)
        //         return ({
        //             message: 'Error occurred in storing file to server'
        //         });
        //     } else {
        //         debugBucket('File Successfully Stored in Server');
        //     }
        // })

        // 3. Cloud firstore upload method call
        const result = await bucket.upload(serverFilePath, options)
        const bucketName = result[0].metadata.bucket

        // 4. Construct download URL
        const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${filename}?alt=media&token=${storageToken}`
        console.log(`File successfully uploaded to storage: ${downloadURL}`)

        // 5.Delete temporary file in server-side uploads
        fs.unlink(serverFilePath, err => {
            if (err) {
                debugBucket(err)
                return ({
                    message: 'Error occurred in removing file from temporary local storage'
                })
            } else {
                debugBucket('File in temporary local storage deleted')
            }
        })
        return downloadURL
    },

    async deleteFileFromBucket(uploadedFile) {
        // 1. DETERMINE CLOUD FILE LOCATION
        const file = bucket.file(uploadedFile);

        // 2. CHECK FILE FOR DELETION EXISTS
        const fileChecker = await file.exists();
        if (fileChecker[0] === false) {
            // TOGGLE: Set custom option parameter to prevent error returning (true = ignores missing file! / false = triggers error on missing file)
            const options = {
                ignoreNotFound: true,
            };
            // issue Delete Request Based on Toggle (fails if ignoreNotFound: false)
            const data = await file.delete(options);
            debugBucket(`The file: ${uploadedFile}, does not exist in Storage. Please check server for inconsistent data handling & database queries.`);

            // Return API response to controller
            return data[0];

            // [SUCCESS] FILE EXISTS: Standard delete path
        } else {

            // 3. SUCCESS DELETE REQUEST ON EXISTING FILE
            const data = await file.delete();
            console.log(`File deleted from Storage Bucket: ${uploadedFile}`);
            // Return API response to controller
            return data[0];
        }
    },

    // Create file name from URL in DB
    getFileFromUrl(downloadURL) {
        debugBucket(`DownloadURL from DB: ${downloadURL}`);
        // Slice off the base URL from downloadURL
        const baseURL = `https://firebasestorage.googleapis.com/v0/b/${config.db.storageBucket}/o/`;
        console.log(baseURL);

        // Remove baseURl from downloadURL
        let fileGlob = downloadURL.replace(baseURL, "");

        // Remove everything after the query string(?)
        const indexOfEndPath = fileGlob.indexOf("?");
        fileGlob = fileGlob.substring(0, indexOfEndPath);

        // Return existing uploaded file glob
        console.log(`Generated File Glob: ${fileGlob}`);
        return fileGlob;
    }
}