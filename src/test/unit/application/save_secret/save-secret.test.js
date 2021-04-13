const Secret = require('../../../../domain/secret/secret');
const SaveSecret = require('../../../../application/save_secret/');
const SecretResponse = require('../../../../application/save_secret/save-secret-response');

describe('Save Token', () => {
    const secretRepositoryMock = { save: jest.fn(), findById: jest.fn() }
    const idGeneratorMock = { generate: jest.fn() }
    const tokenGeneratorMock = { generate: jest.fn() }
    const cipherMock = { encrypt: jest.fn() }

    beforeEach(() => {
        saveSecretMock = new SaveSecret({
            secretRepository: secretRepositoryMock,
            idGenerator: idGeneratorMock,
            tokenGenerator: tokenGeneratorMock,
            cipher: cipherMock,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should save throw error when saving secret fails', async () => {
        const command = { text: 'Holiwis' };
        const secret = new Secret({
            id: 'yyyy',
            secret: 'secret',
            token: 'token',
            secretKey: 'secretKey',
            iv: 'iv',
            createdAt: new Date(),
            updatedAt: new Date()
        })
        secretRepositoryMock.findById.mockReturnValue(secret);
        secretRepositoryMock.save.mockRejectedValue(new Error('Error'));

        await expect(secretRepositoryMock.save(command)).rejects.toThrowError('Error');

        expect(secretRepositoryMock.save).toHaveBeenCalledTimes(1)
        expect(secretRepositoryMock.save).toHaveBeenCalledWith(command)

    });

    test('should save secret', async () => {
        const command = { text: 'Holiwis' };

        cipherMock.encrypt.mockReturnValue({ iv: 'iv', secretKey: 'secretKey', content: 'secret' })
        idGeneratorMock.generate.mockReturnValue('1111')
        tokenGeneratorMock.generate.mockReturnValue('1111')
        secretRepositoryMock.findById.mockReturnValue(null);
        secretRepositoryMock.save.mockReturnValue(Promise.resolve())

        const resultSave = await saveSecretMock.save(command)
     
        expect(resultSave).toEqual(new SecretResponse({token:'1111',id:'1111'}))

        expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1)
        expect(secretRepositoryMock.findById).toHaveBeenCalledWith('1111')

        expect(secretRepositoryMock.save).toHaveBeenCalledTimes(1)       
    });
})