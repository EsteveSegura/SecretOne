class SaveSecretCommand{
    constructor({text, expireAt}){
        this._text = text;
        this._expireAt = expireAt;
    }

    get expireAt(){
        return this._expireAt;
    }

    get text(){
        return this._text;
    }
}

module.exports = SaveSecretCommand;