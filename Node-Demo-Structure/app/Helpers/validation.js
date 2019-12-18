var passwordValidator = require("password-validator");
var password = new passwordValidator();

password
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

class Validation {
  /**
   * Validate Email
   * @param {*} email
   * @author Vijay Prajapati
   */
  validateEmail(email) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const validEmail = emailRegexp.test(email);
    return validEmail;
  }

  /**
   * Validate password
   * @param {*} pass
   */
  validatePassword(pass) {
    return password.validate(pass);
  }

  nameValidate(fname,lname){
    var regName = /^[a-zA-Z]+$/;
    const validFirstName = regName.test(fname) ;
    const validLastName = regName.test(lname);
    return {'FisrtName':validFirstName , 'LastName':validLastName}
  }
}
module.exports = Validation;
