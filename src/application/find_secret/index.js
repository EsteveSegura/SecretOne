const FindSecretResponse = require('./find-secret-response');

<<<<<<< HEAD
class FindSecret {
    constructor({ secretRepository, cipher }) {
        this.secretRepository = secretRepository;
        this.cipher = cipher
    }

    async find({ id, secretKey }) {
        const findSecret = await this.secretRepository.findById(id)

=======
class SaveSecret {
    constructor({ secretRepository, cipher, RedisSecretCache }) {
        this.secretRepository = secretRepository;
        this.cipher = cipher;
        this.RedisSecretCache = RedisSecretCache;
    }

    async find({ id, token }) {
        const findSecret = await this.secretRepository.findById(id);
        const findSecretCache = await this.RedisSecretCache.findById(id);
        console.log(findSecretCache)
        
>>>>>>> fd546c84f0b1be87039691d6f37d0be2177a897b
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