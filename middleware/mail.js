const validator = require('validator');

module.exports = (req, res, next) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(400).json({ message: 'Le mot de passe doit faire au moins 8 caractère, avec au minimum une majuscule, une minuscule, un chiffre et pas d\'espace !' });
    } else {
        next();
    }
};