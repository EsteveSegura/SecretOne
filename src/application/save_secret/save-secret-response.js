class SaveSecretResponse {
    constructor({ secretKey, id, token }) {
        this._id = id;
        this._secretKey = secretKey;
        this._token = token
    }

    get token(){
        return this._token;
        
    }

    get secretKey() {
        return this._secretKey;
    }

    get id() {
        return this._id;
    }
}
module.exports = SaveSecretResponse