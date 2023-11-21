const express = require('express');
const multer = require('multer');
const router = express.Router();

const validateNameMiddleware = require('../validations/validateName.js');

const GamerController = require('../controllers/GamerController.js');

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

router.get('/', (res, req) => {
	res.send('Hello');
});

router.post('/gamer', validateNameMiddleware, GamerController.createGamer);

router.get('/gamers', GamerController.getLeaders);

router.put('/update', GamerController.update);

router.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

module.exports = router;
