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
        
        const findSecret = await this.secretRepository.findById(id);
        this._ensureSecretExists(findSecret);

        const { iv, secretKey, secret } = this._encryptText(text)
        console.log(secret)
        const currentDate = new Date();

        const secretDomain = new Secret({
            id,
            secret,
            token,
            secretKey,
            iv,
            createdAt: currentDate,
            updatedAt: currentDate
        });

        await this.secretRepository.save(secretDomain);
        return new SaveSecretResponse({ token, id })
    }

    _encryptText(text) {
        const secretEncrypted = this.cipher.encrypt(text)
        const { iv, secretKey, content: secret } = secretEncrypted;
        return { iv, secretKey, secret }
    }

    _generateIdAndToken() {
        const id = this.idGenerator.generate()
        const token = this.tokenGenerator.generate()

        return { id, token }
    }

    _ensureSecretExists(secret) {
        if (secret) {
            throw new Error('Secret already exist');
        }
    }
}


module.exports = SaveSecret;