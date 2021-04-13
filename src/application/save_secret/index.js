const Secret = require('../../domain/secret/secret');
const SaveSecretResponse = require('./save-secret-response');

class SaveSecret {
    constructor({ secretRepository, idGenerator, tokenGenerator, cipher, RedisSecretCache }) {
        this.secretRepository = secretRepository;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.cipher = cipher;
        this.RedisSecretCache = RedisSecretCache;
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

<<<<<<< HEAD
        await this.secretRepository.save(secretDomain)
=======
        await this.secretRepository.save(secretDomain);
        await this.RedisSecretCache.save(secretDomain)
        return new SaveSecretResponse({ token, id })
    }
>>>>>>> fd546c84f0b1be87039691d6f37d0be2177a897b

        return new SaveSecretResponse({ id, secretKey, token })
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