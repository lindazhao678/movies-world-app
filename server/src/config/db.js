// Import of admin SDK libraries
var admin = require("firebase-admin")
const config = require('./config')
var serviceAccount = require(config.db.serviceAccountKey)

// Import debug logs
const dbStartup = require('debug')('app:db')
const debugError500 = require('debug')('app:error500')

try {
    // Debug: Notify connection start
    dbStartup('Attampting database connection...')

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: config.db.storageBucket
    })

    // Debug: Notify connection complete
    dbStartup('Connected to the database')

    // Storage core database functions in variables
    const db = admin.firestore()
    const bucket = admin.storage().bucket()

    // Testing : DB ping function
    const dbPing = db.listCollections()
    .then(collections =>{
        for(let collection of collections)
        dbStartup(`Found db collection with id: ${collection.id}`)
    })
    
    // Export database variable methods for use in our application
    module.exports = { db, bucket, dbPing }

} catch (err) {
    debugError500(err)
}