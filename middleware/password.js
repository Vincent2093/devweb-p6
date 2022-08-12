// Middleware vérifiant les exigences de complexité du mot de passe à la création d'un utilisateur
const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le mot de passe doit faire au moins 8 caractère, avec au minimum une majuscule, une minuscule, un chiffre et pas d\'espace !' });
    } else {
        next();
    }
};