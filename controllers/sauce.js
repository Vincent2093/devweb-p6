const Sauce = require('../models/sauce');
const fs = require('fs');

// Fonction pour la récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// Fonction pour la récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Fonction pour la création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersdisLiked: []
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée !' }))
    .catch((error) => res.status(400).json({ error }));
};

// Fonction pour la modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };
  
  delete sauceObject._userId;

  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message : 'Non autorisé !' });
        return;
      }
      if (sauceObject.imageUrl != undefined) {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Ancienne image supprimée !');
          }                   
        });
      };
      
      Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message : 'Sauce modifiée !'}))
        .catch(error => res.status(401).json({ error }));
  })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Fonction pour la suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ message : 'Non autorisé !' });
        return;
      }

      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({_id: req.params.id})
          .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
          .catch(error => res.status(401).json({ error }));
      });
    })
    .catch( error => {
      res.status(500).json({ error });
    });
};

// Fonction pour le système de like et dislike
exports.likeSauce = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id
  
  switch (like) {
    case 1 :
      Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
        .then(() => res.status(200).json({ message: 'Like' }))
        .catch((error) => res.status(400).json({ error }))
    break;

    case 0 :
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) { 
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
              .then(() => res.status(200).json({ message: 'Neutre' }))
              .catch((error) => res.status(400).json({ error }))
          }
          else if (sauce.usersDisliked.includes(userId)) { 
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
              .then(() => res.status(200).json({ message: 'Neutre' }))
              .catch((error) => res.status(400).json({ error }))
          }
        })
        .catch((error) => res.status(404).json({ error }))
    break;

    case -1 :
      Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
        .then(() => { res.status(200).json({ message: 'Dislike' }) })
        .catch((error) => res.status(400).json({ error }))
    break;
      
    default:
      console.log(error);
  }
}