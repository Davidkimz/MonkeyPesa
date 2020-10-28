const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeControllers');
const ensureAuthenticated = require('../middleware/auth')


router.get('/', (req, res) => homeController.index(req, res));

router.get('/about', (req, res) => homeController.about(req, res));

router.get('/news', ensureAuthenticated, (req, res) => homeController.news(req, res));

router.get('/services', ensureAuthenticated, (req, res) => homeController.services(req, res));

module.exports = router;
