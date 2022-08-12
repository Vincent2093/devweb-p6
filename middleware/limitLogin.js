// Middleware limitant le nombre de tentative de connexion à l'authentification avec express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000,
	max: 5,
    message: 'Trop grand nombre d\'essais, merci de réessayer d\'ici quelques minutes !' 
});

module.exports = limiter;