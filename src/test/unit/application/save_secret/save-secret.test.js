const Secret = require('../../../../domain/secret/secret');
const SaveSecret = require('../../../../application/save_secret')
const saveSecretCommand = require('../../../../application/save_secret/save-secret-command')

const MOCK_DATE_STRING = '2021-05-28T21:16:48.030Z'
const mockDate = new Date(MOCK_DATE_STRING);

jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

describe('Save Secret', () => {
    const secretRepositoryMock = { save: jest.fn(), findById: jest.fn() }
    const idGeneratorMock = { generate: jest.fn() }
    const tokenGeneratorMock = { generate: jest.fn() }
    const cipherMock = { encrypt: jest.fn() }

    const id = '111'
    const token = 'xxxxxxxxxxxx'

    beforeEach(() => {
        saveSecretMock = new SaveSecret({
            secretRepository: secretRepositoryMock,
            idGenerator: idGeneratorMock,
            tokenGenerator: tokenGeneratorMock,
            cipher: cipherMock
        });

    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should save secret with correct data', async () => {
        const date = new Date()
        const text = "MySecret"
        const expireAt = 6000

        idGeneratorMock.generate.mockReturnValue(id);
        tokenGeneratorMock.generate.mockReturnValue(token);
        secretRepositoryMock.findById.mockReturnValue(null);

        const commandMock = new saveSecretCommand({ text, expireAt })

        cipherMock.encrypt.mockReturnValue({
            iv: '333',
            secretKey: '444',
            content: 'zzz'
        })

        const secretToSave = new Secret({
            id: '111',
            secret: 'zzz',
            token,
            iv: '333',
            expireAt: new Date(date.getTime() + expireAt * 60000),
            createdAt: date,
            updatedAt: date
        })

        await saveSecretMock.save(commandMock)

        expect(secretRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(secretRepositoryMock.save).toHaveBeenCalledWith(secretToSave);
        expect(cipherMock.encrypt).toHaveBeenCalledTimes(1);
        expect(cipherMock.encrypt).toHaveBeenCalledWith(text);
        expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(secretRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1)
        expect(tokenGeneratorMock.generate).toHaveBeenCalledTimes(1)
    })

    test('should error when secret already exists', async () => {
        const text = "MySecret"
        const expireAt = 6000

        idGeneratorMock.generate.mockReturnValue(id);
        tokenGeneratorMock.generate.mockReturnValue(token);
        secretRepositoryMock.findById.mockReturnValue(id);

        const commandMock = new saveSecretCommand({ text, expireAt })

        cipherMock.encrypt.mockReturnValue({
            iv: '333',
            secretKey: '444',
            content: 'zzz'
        })

        await (expect(saveSecretMock.save(commandMock)))
            .rejects.toThrow(Error)

        expect(secretRepositoryMock.save).toHaveBeenCalledTimes(0);
        expect(cipherMock.encrypt).toHaveBeenCalledTimes(0);
        expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
        expect(secretRepositoryMock.findById).toHaveBeenCalledWith(id);
        expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1)
        expect(tokenGeneratorMock.generate).toHaveBeenCalledTimes(1)
    })
})