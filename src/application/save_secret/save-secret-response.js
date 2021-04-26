class SaveSecretResponse {
    constructor({ secretKey, id, token }) {
        this._id = id;
        this._token = token;
        this._secretKey = secretKey;
    }

    get secretKey() {
        return this._secretKey;
    }

    get token() {
        return this._token;
    }

    get id() {
        return this._id;
    }
}
module.exports = SaveSecretResponse