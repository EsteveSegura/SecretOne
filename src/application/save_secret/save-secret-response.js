class SaveSecretResponse{
    constructor({token,id}){
        this._token = token;
        this._id = id;
    }

    get token(){
        return this._token;
    }

    get id(){
        return this._id;
    }
}

module.exports = SaveSecretResponse;