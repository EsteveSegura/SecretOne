const Secret = require('../../domain/secret/secret');
const SaveSecretResponse = require('./save-secret-response');

class SaveSecret {
    constructor({ secretRepository, idGenerator, tokenGenerator, cipher }) {
        this.secretRepository = secretRepository;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.cipher = cipher;
    }

    async save({ text, expireAt }) {
        const { id, token } = this._generateIdAndToken()
        
        const getSecret = await this.secretRepository.findById(id);
        this._secretExists(getSecret);

        const date = new Date()
        const newDate = new Date(date.getTime() + expireAt * 60000)

        const { iv, secretKey, secret } = this._encryptText(text)
        const secretDomain = new Secret({
            id,
            secret,
            token,
            iv,
            expireAt: newDate,
            createdAt: date,
            updatedAt: date
        });

        await this.secretRepository.save(secretDomain)

        return new SaveSecretResponse({ id, secretKey, token })
    }

    _generateIdAndToken() {
        const id = this.idGenerator.generate()
        const token = this.tokenGenerator.generate()

        return { id, token }
    }

    _encryptText(text) {
        const secretEncrypted = this.cipher.encrypt(text);
        const { iv, secretKey, content: secret } = secretEncrypted;

        return { iv, secretKey, secret }
    }

    _secretExists(secret) {
        if (secret) {
            throw new Error('Secret already exists');
        }
    }
}

module.exports = SaveSecret