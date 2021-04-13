const mongoTimeout = 5000;
let mongoConnectionUri = 'mongodb://localhost:27017/';

const run = {
    server: {
        port: 3001
    },
    mongo:{
        mongoConnectionUri,
        dbName: 'secret',
        timeout: mongoTimeout
    }
}

module.exports = run;