const express = require('express');
const VideoController = require('../controllers/videoController');
const middleware = require('../middleware/authenticateJWT');

const router = express.Router();

router.get('/videos', middleware, VideoController.getVideos);

module.exports = router;
