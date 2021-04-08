const Secret = require('../../../domain/secret/secret');

const mongoSecretParser = ({ muuid }) => {
    return {
        toDomain: ({
            _id,
            secret,
            token,
            secretKey,
            iv,
            createdAt,
            updatedAt }) => {
            const id = (muuid.from(_id)).toString();
            return new Secret({
                id,
                token,
                secret,
                secretKey,
                iv,
                createdAt,
                updatedAt,
            })
        },
        toDocument: ({
            id,
            token,
            secret,
            secretKey,
            iv,
            createdAt,
            updatedAt,
        }) => {
            const _id = muuid.from(id);
            return {
                _id,
                token,
                secret,
                secretKey,
                iv,
                createdAt,
                updatedAt};
        },
    };
};

module.exports = mongoSecretParser;