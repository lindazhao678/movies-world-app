const config = require('./config')

const whitelist = config.corsAllowedOptions

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else {
            callback(new Error('NOT ALLOWED BY CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions