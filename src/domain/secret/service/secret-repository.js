class SecretRepository{
    async findById(id){
        throw new Error('Not implemented');
    }

    async findByToken(token){
        throw new Error('Not implemented');
    }

    async save(secret){
        throw new Error('Not implemented');
    }
    
    async update(secret){
        throw new Error('Not implemented');
    }

    async delete(id){
        throw new Error('Not implemented');
    }
}

module.exports = SecretRepository;