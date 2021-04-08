const Secret = require('../../../../domain/secret/secret');
const SaveSecret = require('../../../../application/save_secret/');
const SaveSecretCommand = require('../../../../application/save_secret/save-secret-command');
const SaveSecretResponse = require('../../../../application/save_secret/save-secret-response');

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

    test('should save secret', async () => {
        tokenGeneratorMock.generate.mockReturnValue('123123')
        idGeneratorMock.generate.mockReturnValue('123123')
        
        const token = tokenGeneratorMock.generate()
        const id = idGeneratorMock.generate()

        secretRepositoryMock.save.mockReturnValue({id,token})

        let secretMock = new Secret(
            { id, secret: 'secret', token, secretKey: '123123123', iv: '234234', createdAt: new Date(), updatedAt: new Date() }
        );

        const mockSaveData = await secretRepositoryMock.save(secretMock)
        await secretRepositoryMock.findById(id)

        cipherMock.encrypt(secretMock.secret)
        cipherMock.encrypt.mockReturnValue({ iv: '', secretKey: '', content: '' })


        expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1)
        expect(secretRepositoryMock.findById).toHaveBeenCalledWith(id)
        expect(cipherMock.encrypt).toHaveBeenCalledTimes(1)

        expect(secretRepositoryMock.save).toHaveBeenCalledWith(secretMock)
        expect(secretRepositoryMock.save).toHaveBeenCalledTimes(1)

        expect(idGeneratorMock.generate).toHaveBeenCalledWith()
        expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1)

        expect(tokenGeneratorMock.generate).toHaveBeenCalledWith()
        expect(tokenGeneratorMock.generate).toHaveBeenCalledTimes(1)

        expect(mockSaveData).toEqual({token,id})
    });
})