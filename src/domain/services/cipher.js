class Cipher {
    constructor({ crypto }) {
        this.crypto = crypto;
    }

    encrypt(text) {
        const secretKey = this.crypto.randomBytes(32);
        const iv = this.crypto.randomBytes(16);

        const cipher = this.crypto.createCipheriv('aes-256-ctr', secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex'),
            secretKey: secretKey.toString('hex')
        };
    }

    decrypt(hash) {
        const secretKey = Buffer.from(hash.secretKey, 'hex')
        const decipher = this.crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(hash.iv, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

        return decrpyted.toString();
    }
}

module.exports = Cipher