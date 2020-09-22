const express = require('express');
const router = express.Router();
const changePasswordRequestController = require("../controllers/ChangePasswordRequestController")

router.post("/forgotPassword", (req,res) => changePasswordRequestController.forgotPassword(req, res))
router.put("/updatePassword", (req, res) => changePasswordRequestController.updatePassword(req, res))

module.exports = router;