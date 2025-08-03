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

const decrypt = (encryptedData) => {
    try {
        const hash = JSON.parse(encryptedData);
        
        const decipher = crypto.createDecipheriv(
            algorithm,
            Buffer.from(secretKey, 'hex'),
            Buffer.from(hash.initVect, 'hex')
        );
        
        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(hash.content, 'hex')),
            decipher.final()
        ]);
        
        return decrypted.toString();
    } catch (error) {
        console.error("Decryption error:", error);
        return "Decryption Error!";
    }
};

module.exports = { encrypt, decrypt };