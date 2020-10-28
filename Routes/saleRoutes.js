const express = require('express');
const router = express.Router();
const checkLogin = require("../middleware/checkLogin")

const SaleController = require("../controllers/SaleControllers")
const saleController = new SaleController();


router.get('/', checkLogin, (req, res) => saleController.sales(req, res));

router.get('/list', checkLogin, (req, res) => saleController.list(req, res));

module.exports = router;
