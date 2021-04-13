const Secret = require('../../../domain/secret/secret');

const mongoSecretParser = ({ mmuid }) => {
    return {
        toDomain: ({
            _id,
            secret,
            token,
            iv,
            createdAt,
            updatedAt }) => {
            const id = (mmuid.from(_id)).toString();
            return new Secret({
                id,
                token,
                secret,
                iv,
                createdAt,
                updatedAt
            })
        },
        toDocument: ({
            id,
            token,
            secret,
            iv,
            createdAt,
            updatedAt }) => {
            const _id = mmuid.from(id);
            return {
                _id,
                token,
                secret,
                iv,
                createdAt,
                updatedAt
            };
        }
    }
}

module.exports = mongoSecretParser