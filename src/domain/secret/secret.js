class Secret {
    constructor({ id, secret, token, secretKey, iv, createdAt, updatedAt }) {
        this.id = id;
        this.secret = secret;
        this.token = token;
        this.secretKey = secretKey;
        this.iv = iv;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        if (!id) {
            throw new Error('Field id in Secret cannot be empty')
        }

        this._id = id;
    }

    get secret() {
        return this._secret;
    }

    set secret(secret) {
        if (!secret) {
            throw new Error('Field secret in Secret cannot be empty')
        }

        this._secret = secret;
    }

    get token() {
        return this._token;
    }

    set token(token) {
        if (!token) {
            throw new Error('Field token in Secret cannot be empty')
        }

        this._token = token;
    }

    get secretKey() {
        return this._secretKey;
    }

    set secretKey(secretKey) {
        if (!secretKey) {
            throw new Error('Field secretKey in Secret cannot be empty')
        }

        this._secretKey = secretKey;
    }

    get iv() {
        return this._iv;
    }

    set iv(iv) {
        if (!iv) {
            throw new Error('Field iv in Secret cannot be empty')
        }

        this._iv = iv;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(createdAt) {
        if (!createdAt) {
            throw new Error('Field createdAt in Secret cannot be empty')
        }

        this._createdAt = createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(updatedAt) {
        if (!updatedAt) {
            throw new Error('Field updatedAt in Secret cannot be empty')
        }

        this._updatedAt = updatedAt;
    }
}

module.exports = Secret;