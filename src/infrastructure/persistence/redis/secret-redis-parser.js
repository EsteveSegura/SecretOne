const Secret = require('../../../domain/secret/secret');

const redisSecretParser = () => {
    return {
        toDomain: ({_id,_secret,_token,_secretKey,_iv,_createdAt,_updatedAt }) => {
            return new Secret({
                id:_id,
                token:_token,
                secret:_secret,
                secretKey:_secretKey,  
                iv:_iv,
                createdAt:_createdAt,
                updatedAt:_updatedAt,
            })
        },
    };
};

module.exports = redisSecretParser;