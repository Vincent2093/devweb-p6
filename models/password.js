const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)
  .is().max(20)
  .has().uppercase(1)
  .has().lowercase(1)
  .has().digits(1)
  .has().not().spaces();

module.exports = passwordSchema;