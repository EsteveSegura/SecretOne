const mongoTimeout = 5000;
let mongoConnectionUri = 'mongodb://localhost:27017/';

const run = {
    server: {
        port: 3000,
        host: 'https://keepsecrets.me'
    },
    mongo:{
        mongoConnectionUri,
        dbName: 'secret',
        timeout: mongoTimeout
    },
    slack:{
        token: process.env.SLACK_TOKEN,
        botName: 'Testt',
        expireAt: "5"
    }
}

module.exports = run;