const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
 class CryptrPassword{
     /**
     * encrypt passsword
     * @param {*} text 
     * @author Vijay Prajapati
     */
    encrypt(text) {
        return cryptr.encrypt(text);
    }

    /**
     * Decrypt passsword
     * @param {*} text 
     * @author Vijay Prajapati
     */
    decrypt(text) {
        return cryptr.decrypt(text)
    }
}
 
module.exports = CryptrPassword