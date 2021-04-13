const MUUID = require('uuid-mongodb');
const SecretRepository = require('../../../domain/secret/service/secret-repository');

class MongoSecretRepository extends SecretRepository{
    constructor({mongoDbHandler, secretDocumentParser}){
        super();
        this.mongoDbHandler = mongoDbHandler;
        this.secretDocumentParser = secretDocumentParser
    }

    async findById(id){
        const db = await this.mongoDbHandler.getInstance();
        try {
            const secretDocument = await db.collection('secrets').findOne({_id: MUUID.from(id)})
            return secretDocument ? this.secretDocumentParser.toDomain(secretDocument) : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async findByToken(token){
        throw new Error('Not implemented');
    }

    async save(secret){
        const db = await this.mongoDbHandler.getInstance();
        try {
            const secretDocument = this.secretDocumentParser.toDocument(secret);
            await db.collection('secrets').insertOne(secretDocument);

            return Promise.resolve();
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async update(secret){
        throw new Error('Not implemented');
    }

    async delete(id){
        const db = await this.mongoDbHandler.getInstance();        
        try {
            await db.collection('secrets').deleteOne({_id: MUUID.from(id)})
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = MongoSecretRepository;
