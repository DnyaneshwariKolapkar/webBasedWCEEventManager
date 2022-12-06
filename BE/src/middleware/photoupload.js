const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/eventImages');
    },
    filename: function (req, file, cb) {
        cb(null, crypto.randomBytes(16).toString('hex') + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;