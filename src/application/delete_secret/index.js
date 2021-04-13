class DeleteSecret {
    constructor({ secretRepository }) {
        this.secretRepository = secretRepository;
    }

    async delete({ id, token }) {
        const findSecret = await this.secretRepository.findById(id)
        
        this._ensureSecretExists(findSecret);
        findSecret.ensureIdIsValid(id)
        findSecret.ensureTokenIsValid(token)

        await this.secretRepository.delete(id);
    }

    _ensureSecretExists(secret) {
        if (!secret) {
            throw new Error('Secret does not exists');
        }
    }
}

module.exports = DeleteSecret