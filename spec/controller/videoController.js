const multer = require('multer');
const Video = require('../models/Video');
const User = require('../models/User');

exports.upload_file = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + ext);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 * 1024 },
});

exports.upload_db = async (req, res) => {
    try {
        const users = new User();
        const data = await new Video({
            filename: req.file.filename
        }).save();
        res.json(data);
    } catch(e) {
        console.error(e);
    }
};

exports.video = async (req, res) => {
  res.send('hi');
};