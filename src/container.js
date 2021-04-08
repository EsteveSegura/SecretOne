const awilix = require('awilix');

const MongoSecretRepository = require('./infrastructure/persistence/mongo/mongo-secret-repository');
const mongoDbHandler = require('./infrastructure/persistence/mongo/db-handler');
const secretDocumentParser = require('./infrastructure/persistence/mongo/secret-document-parser');
const MUUID = require('uuid-mongodb');
const SaveSecret = require('./application/save_secret');
const FindSecret = require('./application/find_secret');
const DeleteSecret = require('./application/delete_secret');
const idGenerator = require('./domain/services/id-generator');
const Cipher = require('./domain/services/cipher');
const crypto = require('crypto');
const tokenGenerator = require('./domain/services/token-generator');
const {v4 : uuidv4} = require('uuid');


const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    secretRepository: awilix.asClass(MongoSecretRepository),
    mongoDbHandler: awilix.asFunction(mongoDbHandler),
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
});

module.exports = container;