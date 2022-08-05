const validator = require('validator');

module.exports = (req, res, next) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(400).json({ message: 'Le format de l\'adresse mail n\'est pas valide !' });
    } else {
        next();
    }
};