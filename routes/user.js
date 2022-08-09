const express = require('express');
const router = express.Router();

const mail = require('../middleware/mail');
const password = require('../middleware/password');
const userCtrl = require('../controllers/user');
const limitLogin = require('../middleware/limitLogin');

router.post('/signup', mail, password, userCtrl.signUp);
router.post('/login', limitLogin, userCtrl.login);

module.exports = router;