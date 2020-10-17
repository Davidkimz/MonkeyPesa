const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeControllers');


router.get('/', (req, res) => homeController.index(req, res));

router.get('/about', (req, res) => homeController.about(req, res));

router.get('/contacts', (req, res) => homeController.contact(req, res));

router.get('/news', (req, res) => homeController.news(req, res));

router.get('/services', (req, res) => homeController.services(req, res));

module.exports = router;