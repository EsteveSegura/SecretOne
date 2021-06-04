const Secret = require('../../../../domain/secret/secret');
const FindSecret = require('../../../../application/find_secret')
const findSecretCommand = require('../../../../application/find_secret/find-secret-command')


describe('Save Secret', () => {
    const secretRepositoryMock = { findById: jest.fn(), delete: jest.fn() }
    const cipherMock = { decrypt: jest.fn() }

    const id = '111'
    const secretKey = 'gbujqeujiqweuigbuiqwe'
    const date = new Date()

    beforeEach(() => {
        findSecretMock = new FindSecret({
            secretRepository: secretRepositoryMock,
            cipher: cipherMock
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should find and delete secret if data is correct', async () => {
        const foundSecret = new Secret({
            id,
            secret: 'zzz',
            token: '2222',
            iv: '333',
            expireAt: date.getDate(),
            createdAt: date.getDate(),
            updatedAt: date.getDate()
        });

        const decrypt = { content: foundSecret._secret, secretKey, iv: foundSecret._iv }

        secretRepositoryMock.findById.mockReturnValue(foundSecret);
        cipherMock.decrypt.mockReturnValue('MySecretReadable')

        const commandMock = new findSecretCommand({ id, secretKey })
        await findSecretMock.find(commandMock)

        expect(secretRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(cipherMock.decrypt).toHaveBeenCalledWith(decrypt);
        expect(cipherMock.decrypt).toHaveBeenCalledTimes(1);
        expect(secretRepositoryMock.delete).toHaveBeenCalledWith(id);
        expect(secretRepositoryMock.delete).toHaveBeenCalledTimes(1);
    })

    test('should error when cant find the secret', async () => {
        secretRepositoryMock.findById.mockReturnValue(null);

        const commandMock = new findSecretCommand({ id, secretKey })
        await (expect(findSecretMock.find(commandMock)))
            .rejects.toThrow(Error)

        expect(secretRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
    })
})