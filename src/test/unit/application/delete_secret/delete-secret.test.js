const Secret = require('../../../../domain/secret/secret');
const DeleteSecret = require('../../../../application/delete_secret')
const deleteSecretCommand = require('../../../../application/delete_secret/delete-secret-command')

describe('Save Secret', () => {
    const secretRepositoryMock = { delete: jest.fn(), findById: jest.fn() }

    const id = '111'
    const token = 'xxxxxxxx'

    beforeEach(() => {
        deleteSecretMock = new DeleteSecret({
            secretRepository: secretRepositoryMock,
        });
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should delete secret with correct data', async () => {
        const date = new Date()
        const expireAt = 6000

        const secretToDelete = new Secret({
            id: '111',
            secret: 'zzz',
            token,
            iv: '333',
            expireAt: new Date(date.getTime() + expireAt * 60000),
            createdAt: date,
            updatedAt: date
        });

        secretRepositoryMock.findById.mockReturnValue(secretToDelete);
        const commandMock = new deleteSecretCommand({ id, token });

        await deleteSecretMock.delete(commandMock);

        expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(secretRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(secretRepositoryMock.delete).toHaveBeenCalledTimes(1);
        expect(secretRepositoryMock.delete).toHaveBeenCalledWith(id);
    });

    test('should error when trying to delete a secret when not found', async () => {
        secretRepositoryMock.findById.mockReturnValue(null);
        const commandMock = new deleteSecretCommand({ id, token });

        await (expect(deleteSecretMock.delete(commandMock)))
            .rejects.toThrow(Error);

        expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(secretRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(secretRepositoryMock.delete).toHaveBeenCalledTimes(0);
    });
})