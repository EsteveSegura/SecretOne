class SaveSecretResponse {
    constructor({ secretKey, id }) {
        this._id = id;
        this._secretKey = secretKey;
    }

    get secretKey() {
        return this._secretKey;
    }

    get id() {
        return this._id;
    }
}
module.exports = SaveSecretResponse