class SaveSecretCommand{
    constructor({text}){
        this._text = text;
    }

    get text(){
        return this._text
    }
}

module.exports = SaveSecretCommand;