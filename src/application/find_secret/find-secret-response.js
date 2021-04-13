class FindSecretResponse{
    constructor({secret}){
        this._secret = secret;
    }

    get secret(){
        return this._secret
    }
}

module.exports = FindSecretResponse