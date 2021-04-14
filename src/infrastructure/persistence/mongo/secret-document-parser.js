const Secret = require('../../../domain/secret/secret');

const mongoSecretParser = ({ mmuid }) => {
    return {
        toDomain: ({
            _id,
            secret,
            token,
            iv,
            expireAt,
            createdAt,
            updatedAt }) => {
            const id = (mmuid.from(_id)).toString();
            return new Secret({
                id,
                token,
                secret,
                iv,
                expireAt,
                createdAt,
                updatedAt
            })
        },
        toDocument: ({
            id,
            token,
            secret,
            iv,
            expireAt,
            createdAt,
            updatedAt }) => {
            const _id = mmuid.from(id);
            return {
                _id,
                token,
                secret,
                iv,
                expireAt,
                createdAt,
                updatedAt
            };
        }
    }
}

module.exports = mongoSecretParser