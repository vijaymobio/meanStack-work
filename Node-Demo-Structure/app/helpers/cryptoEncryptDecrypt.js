crypto = require('crypto');
algorithm = 'aes-256-cbc';
key = crypto.randomBytes(32);
iv = crypto.randomBytes(16);
 class CryptoEncryptDecrypt{
     /**
     * encrypt passsword
     * @param {*} text 
     * @author Vijay Prajapati
     */
    encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }

    /**
     * Decrypt passsword
     * @param {*} text 
     * @author Vijay Prajapati
     */
    decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
    }
}
 
module.exports = CryptoEncryptDecrypt