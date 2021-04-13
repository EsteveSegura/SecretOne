require('dotenv').config()

const mongoTimeout = process.env.MONGO_TIMEOUT || 5000;
let mongoConnectionUri = process.env.MONGO_URI || 'mongodb://localhost:27017/';
let redisConnectionUri = process.env.REDIS_URI || 'redis://redis'
console.log(process.env.MONGO_URI)
console.log(process.env.REDIS_URI)

const run = {
    server: {
        port: 3000
    },
    redis: {
        redisAttemps: 10,
        redisTimeOut: 60,
        redisConnectionUri,
        authCodeExpiration: 7200
    },
    mongo: {
        mongoConnectionUri,
        dbName: process.env.MONGO_DB_NAME || 'secret',
        timeout: mongoTimeout
    }
}

module.exports = run;