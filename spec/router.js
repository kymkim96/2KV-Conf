const express = require('express');
const router = express.Router();
const { upload_file, upload_db, video } = require('./controller/videoController');

router.get('/', (req, res) => {
    res.send('홈');
});
router.post('/upload', upload_file.single('file'), upload_db);
router.get('/video/:id', video);

module.exports = router;
