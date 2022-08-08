const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const fileFilter = (req, file, callback) =>{
  if (!(file.mimetype in MIME_TYPES)) {
   return callback(new Error('Le format de l\'image n\'est pas autorisé !'))
  }
  callback(null, true)
}

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
      callback(null,  Date.now() + '_' + name);
  },
});

module.exports = multer({
  fileFilter,
  storage,
  limits: { fileSize: 1000000 },
}).single('image');