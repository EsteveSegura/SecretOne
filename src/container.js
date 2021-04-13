const awilix = require('awilix');

const MUUID = require('uuid-mongodb');
const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const MongoSecretRepository = require('./infrastructure/persistence/mongo/mongo-secret-repository');
const secretDocumentParser = require('./infrastructure/persistence/mongo/secret-document-parser');
<<<<<<< HEAD
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler');
=======
const secretRedisParser = require('./infrastructure/persistence/redis/secret-redis-parser');
const MUUID = require('uuid-mongodb');
>>>>>>> fd546c84f0b1be87039691d6f37d0be2177a897b
const SaveSecret = require('./application/save_secret');
const FindSecret = require('./application/find_secret');
const DeleteSecret = require('./application/delete_secret');
const idGenerator = require('./domain/services/id-generator');
<<<<<<< HEAD
const tokenGenerator = require('./domain/services/token-generator');
const Cipher = require('./domain/services/cipher');
=======
const Cipher = require('./domain/services/cipher');
const crypto = require('crypto');
const RedisHandler = require('./infrastructure/persistence/redis/redis-handler');
const RedisSecretCache = require('./infrastructure/persistence/redis/redis-secret-cache');
const {promisify} = require('util');
const tokenGenerator = require('./domain/services/token-generator');
const { v4: uuidv4 } = require('uuid');
>>>>>>> fd546c84f0b1be87039691d6f37d0be2177a897b


const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
})

container.register({
    uuidv4: awilix.asValue(uuidv4),
    mmuid: awilix.asValue(MUUID),
    crypto: awilix.asValue(crypto),
    mongoDbHandler: awilix.asFunction(mongoDbHandler),
<<<<<<< HEAD
=======
    redisHandler: awilix.asClass(RedisHandler),
    RedisSecretCache: awilix.asClass(RedisSecretCache),
    secretRedisParser: awilix.asFunction(secretRedisParser),
    muuid: awilix.asValue(MUUID),
>>>>>>> fd546c84f0b1be87039691d6f37d0be2177a897b
    secretDocumentParser: awilix.asFunction(secretDocumentParser),
    secretRepository: awilix.asClass(MongoSecretRepository),
    saveSecret: awilix.asClass(SaveSecret),
    findSecret: awilix.asClass(FindSecret),
    deleteSecret: awilix.asClass(DeleteSecret),
    idGenerator: awilix.asFunction(idGenerator),
    tokenGenerator: awilix.asFunction(tokenGenerator),
<<<<<<< HEAD
    cipher: awilix.asClass(Cipher)

})
=======
    promisify: awilix.asValue(promisify),
});
>>>>>>> fd546c84f0b1be87039691d6f37d0be2177a897b

module.exports = container