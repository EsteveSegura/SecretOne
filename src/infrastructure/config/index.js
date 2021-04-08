const mongoTimeout = process.env.MONGO_TIMEOUT || 5000;
let mongoConnectionUri = process.env.MONGO_URI || 'mongodb://localhost:27017/';

const run = {
    server: {
        port: 3000
    },
    mongo: {
        mongoConnectionUri,
        dbName: process.env.MONGO_DB_NAME || 'secret',
        timeout: mongoTimeout
    }
}

module.exports = run;