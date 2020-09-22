const express = require('express');
const router = express.Router();

const EmailController = require("../controllers/EmailControllers")
const emailController = new EmailController();


router.post("/", (req, res) => emailController.sendMail(req, res));

module.exports = router;