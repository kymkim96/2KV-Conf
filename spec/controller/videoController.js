const multer = require('multer');
const Video = require('../models/Video');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

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

exports.upload_db = async (req, res, next) => {
    try {
        const users = new User();
        const data = await new Video({
            filename: req.file.filename
        }).save();
        res.json(data);
    } catch(e) {
        console.error(e);
        next(e);
    }
};

exports.video = async (req, res, next) => {
    const { id } = req.params;
    try {
        const video = await Video.where({ 'id': id }).fetch({ required: true });
        const videoName = video.attributes.filename;
        const videoPath = `./uploads/${videoName}`;
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const stream = fs.createReadStream(videoPath);

        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        stream.pipe(res);
    } catch(e) {
        console.error(e);
        next(e);
    }
};