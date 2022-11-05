module.exports = {
    // Port Setting
    port: process.env.PORT,

    // Database Setting
    db: {
        serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        storageBucket: process.env.STORAGE_BUCKET_URL
    },

    // Auth setting
    authentication: {
        jwtSecret: process.env.JWT_SECRET
    },

    // Approved CORS root URLs
    corsAllowedOptions: [
        process.env.CORS_WHITELIST_DEV,
        process.env.CORS_WHITELIST_PROD
    ]
}