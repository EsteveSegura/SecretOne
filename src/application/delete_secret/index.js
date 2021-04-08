class DeleteSecret {
    constructor({ secretRepository }) {
        this.secretRepository = secretRepository;
    }

    async delete({ id, token }) {
        const getSecret = await this.secretRepository.findById(id);
        this._ensureSecretExists(getSecret);
        
        const bearerToken = this._splitAndCheckToken(token);
        this._ensureTokenIsValid(getSecret, id, bearerToken)
        
        await this.secretRepository.delete(id);
    }

    _splitAndCheckToken(token){
        const splitedToken = token.split(" ")
        
        if(splitedToken[0] == "Bearer"){
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

module.exports = DeleteSecret;