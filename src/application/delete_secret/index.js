class DeleteSecret {
    constructor({ secretRepository, RedisSecretCache }) {
        this.secretRepository = secretRepository;
        this.RedisSecretCache = RedisSecretCache;
    }

    async delete({ id, token }) {
        const findSecret = await this.secretRepository.findById(id);

        this._ensureSecretExists(findSecret);
        this._ensureTokenIsValid(findSecret, id, token);
        
        await this.RedisSecretCache.delete(id);
        await this.secretRepository.delete(id);
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

module.exports = DeleteSecret;