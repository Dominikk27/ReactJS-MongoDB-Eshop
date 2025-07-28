const env = require('dotenv');
const crypto = require('crypto');


const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_KEY;
const initVect = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), initVect);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return{
        initVect: initVect.toString('hex'),
        content: encrypted.toString('hex')
    };
}

function decrypt(hash) {
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(secretKey),
        Buffer.from(hash.iv, 'hex')
    );
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, 'hex')),
        decipher.final()
    ]);
    return decrypted.toString('utf8');
}

module.exports = { encrypt, decrypt };