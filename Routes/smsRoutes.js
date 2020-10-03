const express = require('express');
const router = express.Router();
const ensureAuthenticated= require("../middleware/auth")

const SmsController = require("../controllers/SmsControllers");
const smsController= new SmsController();

//SMS
router.post("/create",ensureAuthenticated,(req, res) => smsController.createSms(req, res));
// router.get("/",  ensureAuthenticated, (req, res) => smsController.getAllSms(req, res));
// router.get("/:id",  ensureAuthenticated, (req, res) => smsController.getSms(req, res));
// router.patch("/:id",  ensureAuthenticated, (req, res) => smsController.upSms(req, res));
// router.delete("/:id", ensureAuthenticated, (req, res) => smsController .deleteSms(req, res));



module.exports = router;
