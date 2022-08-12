const express = require('express');
const router = express.Router();

// Controller et middlewares nécessaires aux routes
const userCtrl = require('../controllers/user');
const mail = require('../middleware/mail');
const password = require('../middleware/password');
const limitLogin = require('../middleware/limitLogin');

// Routes pour la création et l'authentification d'un utilisateur
router.post('/signup', mail, password, userCtrl.signUp);
router.post('/login', limitLogin, userCtrl.login);

module.exports = router;