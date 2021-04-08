const FindSecretResponse = require('./find-secret-response');

class SaveSecret {
    constructor({ secretRepository, cipher }) {
        this.secretRepository = secretRepository;
        this.cipher = cipher;
    }

    async find({ id, token }) {
        const getSecret = await this.secretRepository.findById(id);

        this._ensureSecretExists(getSecret);
        const bearerToken = this._splitAndCheckToken(token);

        this._ensureTokenIsValid(getSecret, id, bearerToken);

        const secret = this._decrypt(getSecret);

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

    _splitAndCheckToken(token) {
        const splitedToken = token.split(" ")

        if (splitedToken[0] == "Bearer") {
            return splitedToken[1]
        }

        throw new Error('Bearer not valid');
    }

    _ensureTokenIsValid(secret, id, token) {
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