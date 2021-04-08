const Secret = require('../../domain/secret/secret');
const SaveSecretResponse = require('./save-secret-response');


class SaveSecret {
    constructor({ secretRepository, idGenerator, tokenGenerator, cipher }) {
        this.secretRepository = secretRepository;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.cipher = cipher;
    }

    async save({ text }) {
        const secretEncrypted = this.cipher.encrypt(text)
        const { iv, secretKey, content: secret } = secretEncrypted;

        const id = this.idGenerator.generate()
        const token = this.tokenGenerator.generate()
        const createdAt = new Date
        const updatedAt = new Date
        const secretDomain = new Secret({ id, secret, token, secretKey, iv, createdAt, updatedAt })

        const getSecret = await this.secretRepository.findById(id);
        this._ensureSecretExists(getSecret);

        await this.secretRepository.save(secretDomain);

        return new SaveSecretResponse({ token, id })
    }

    _ensureSecretExists(secret) {
        if (secret) {
            throw new Error('Secret already exist');
        }
    }
}


module.exports = SaveSecret;