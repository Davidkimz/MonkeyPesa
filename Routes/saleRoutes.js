const express = require('express');
const router = express.Router();
const saleController = require('../controllers/SaleControllers');

router.get('/sales', (req, res) => saleController.sales(req, res));

router.get('/contact', (req, res) => saleController.contact(req, res));

router.get('/list', (req, res) => saleController.list(req, res));

module.exports = router;
