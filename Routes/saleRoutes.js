const express = require('express');
const router = express.Router();
const ensureAuthenticated= require("../middleware/auth")

const SaleController = require("../controllers/SaleControllers")
const saleController = new SaleController();


router.get('/', ensureAuthenticated, (req, res) => saleController.sales(req, res));

router.get('/list', ensureAuthenticated, (req, res) => saleController.list(req, res));

module.exports = router;
