const FindSecretResponse = require('./find-secret-response');

class SaveSecret {
    constructor({ secretRepository, cipher }) {
        this.secretRepository = secretRepository;
        this.cipher = cipher;
    }

    async find({ id, token }) {
        const findSecret = await this.secretRepository.findById(id);

        this._ensureSecretExists(findSecret);
        this._ensureTokenAndIdAreValid(findSecret, id, token);
        const secret = this._decrypt(findSecret);

        return new FindSecretResponse({ secret });
    }

    _decrypt(secret) {
        const hash = {
            content: secret._secret,
            secretKey: secret._secretKey,
            iv: secret._iv
        }
        return this.cipher.decrypt(hash);
    }

    _ensureTokenAndIdAreValid(secret, id, token) {
        if (secret._id != id || secret._token != token) {
            throw new Error('Grant not valid');
        }
    }

    _ensureSecretExists(secret) {
        if (!secret) {
            throw new Error('Secret does not exist');
        }
    }
}


module.exports = SaveSecret;