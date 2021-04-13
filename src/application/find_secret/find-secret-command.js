class FindSecretCommand{
    constructor({id,secretKey}){
        this._id = id;
        this._secretKey = secretKey;
    }

    get id(){
        return this._id
    }

    get secretKey(){
        return this._secretKey
    }
}

module.exports = FindSecretCommand