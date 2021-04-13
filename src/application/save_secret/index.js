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
        const { id, token } = this._generateIdAndToken()
        const currentDate = new Date()

        const getSecret = await this.secretRepository.findById(id);
        this._secretExists(getSecret);

        const { iv, secretKey, secret } = this._encryptText(text)
        const secretDomain = new Secret({
            id,
            secret,
            token,
            iv,
            createdAt: currentDate,
            updatedAt: currentDate
        });

        await this.secretRepository.save(secretDomain)

        return new SaveSecretResponse({ id, secretKey })
    }

    _generateIdAndToken() {
        const id = this.idGenerator.generate()
        const token = this.tokenGenerator.generate()

        return { id, token }
    }

    _encryptText(text) {
        const secretEncrypted = this.cipher.encrypt(text);
        console.log(secretEncrypted)
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