const express = require('express');
const router = express.Router();

const mail = require('../middleware/mail');
const password = require('../middleware/password');
const userCtrl = require('../controllers/user');

router.post('/signup', mail, password, userCtrl.signUp);
router.post('/login', userCtrl.login);

module.exports = router;