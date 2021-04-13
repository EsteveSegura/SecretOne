const Secret = require('../../../../domain/secret/secret');
const SaveSecret = require('../../../../application/save_secret')

describe('Save Secret', () => {
    const secretRepositoryMock = { save:jest.fn(), findById: jest.fn() }
    const idGeneratorMock = { generate: jest.fn()}
    const tokenGeneratorMock = { generate: jest.fn()}
    const cipherMock = { encrypt: jest.fn()}

    beforeEach(() => {
        saveSecretMock = new SaveSecret({
            secretRepository: secretRepositoryMock,
            idGenerator: idGeneratorMock,
            tokenGenerator: tokenGeneratorMock,
            cipher: cipherMock
        })
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should save secret', async() => {

    })
})