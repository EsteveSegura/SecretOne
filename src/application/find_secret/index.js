const FindSecretResponse = require('./find-secret-response');

class FindSecret {
    constructor({ secretRepository, cipher }) {
        this.secretRepository = secretRepository;
        this.cipher = cipher
    }

    async find({ id, secretKey }) {
        const findSecret = await this.secretRepository.findById(id)

        this._ensureSecretExists(findSecret);
        findSecret.ensureIdIsValid(id)
        
        const secret = this._decrypt(findSecret, secretKey);
        this.secretRepository.delete(id);

        return new FindSecretResponse({ secret })
    }

    _decrypt(secret, secretKey) {
        const hash = { content: secret._secret, secretKey, iv: secret._iv }
        return this.cipher.decrypt(hash)
    }

    _ensureSecretExists(secret) {
        if (!secret) {
            throw new Error('Secret does not exists');
        }
    }
}

module.exports = FindSecret