class DeleteSecretCommand{
    constructor({id,token}){
        this._id = id;
        this._token = token;
    }

    get id(){
        return this._id
    }

    get token(){
        return this._token
    }
}

module.exports = DeleteSecretCommand