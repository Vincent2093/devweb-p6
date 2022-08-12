const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma de données userSchema avec mongoose
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Vérification du caractère unique du champ email de notre schéma de données userSchema avec mongoose-unique-validator
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);