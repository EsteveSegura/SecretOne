const awilix = require('awilix');

const MongoSecretRepository = require('./infrastructure/persistence/mongo/mongo-secret-repository');
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler');
const secretDocumentParser = require('./infrastructure/persistence/mongo/secret-document-parser');
const secretRedisParser = require('./infrastructure/persistence/redis/secret-redis-parser');
const MUUID = require('uuid-mongodb');
const SaveSecret = require('./application/save_secret');
const FindSecret = require('./application/find_secret');
const DeleteSecret = require('./application/delete_secret');
const idGenerator = require('./domain/services/id-generator');
const Cipher = require('./domain/services/cipher');
const crypto = require('crypto');
const RedisHandler = require('./infrastructure/persistence/redis/redis-handler');
const RedisSecretCache = require('./infrastructure/persistence/redis/redis-secret-cache');
const {promisify} = require('util');
const tokenGenerator = require('./domain/services/token-generator');
const { v4: uuidv4 } = require('uuid');


const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    secretRepository: awilix.asClass(MongoSecretRepository),
    mongoDbHandler: awilix.asFunction(mongoDbHandler),
    redisHandler: awilix.asClass(RedisHandler),
    RedisSecretCache: awilix.asClass(RedisSecretCache),
    secretRedisParser: awilix.asFunction(secretRedisParser),
    muuid: awilix.asValue(MUUID),
    secretDocumentParser: awilix.asFunction(secretDocumentParser),
    saveSecret: awilix.asClass(SaveSecret),
    findSecret: awilix.asClass(FindSecret),
    deleteSecret: awilix.asClass(DeleteSecret),
    uuidv4: awilix.asValue(uuidv4),
    idGenerator: awilix.asFunction(idGenerator),
    cipher: awilix.asClass(Cipher),
    crypto: awilix.asValue(crypto),
    tokenGenerator: awilix.asFunction(tokenGenerator),
    promisify: awilix.asValue(promisify),
});

module.exports = container;