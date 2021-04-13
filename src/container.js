const awilix = require('awilix');

const MUUID = require('uuid-mongodb');
const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const MongoSecretRepository = require('./infrastructure/persistence/mongo/mongo-secret-repository');
const secretDocumentParser = require('./infrastructure/persistence/mongo/secret-document-parser');
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler');
const SaveSecret = require('./application/save_secret');
const FindSecret = require('./application/find_secret');
const DeleteSecret = require('./application/delete_secret');
const idGenerator = require('./domain/services/id-generator');
const tokenGenerator = require('./domain/services/token-generator');
const Cipher = require('./domain/services/cipher');


const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
})

container.register({
    uuidv4: awilix.asValue(uuidv4),
    mmuid: awilix.asValue(MUUID),
    crypto: awilix.asValue(crypto),
    mongoDbHandler: awilix.asFunction(mongoDbHandler),
    secretDocumentParser: awilix.asFunction(secretDocumentParser),
    secretRepository: awilix.asClass(MongoSecretRepository),
    saveSecret: awilix.asClass(SaveSecret),
    findSecret: awilix.asClass(FindSecret),
    deleteSecret: awilix.asClass(DeleteSecret),
    idGenerator: awilix.asFunction(idGenerator),
    tokenGenerator: awilix.asFunction(tokenGenerator),
    cipher: awilix.asClass(Cipher)

})

module.exports = container