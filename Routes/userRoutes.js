const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth')
const restrictTo = require("../middleware/restrictRoute")


const UserController = require("../controllers/userControllers")
const userController = new UserController();




//GETALL ROUTE
router.get("/"  ,(req, res) => userController.getAllAccounts(req, res));

//REGISTER ROUTE
router.post("/register", (req, res) => userController.register(req, res));

//LOGIN
router.post("/login", (req, res) => userController.login(req,res));

//Delete account(on a private route allows you delete only your account)
router.delete("/delete", ensureAuthenticated, (req, res) => userController.deleteUser(req, res))

//End point to verify if user is logged in.
router.post("/tokenIsValid", (req, res) => userController.isTokenValid(req,res))


//Forget password and reset
router.put("/forgot-passwrod", (req,res) => resetPasswordController.forgotPassword(req, res))

router.get("/:id",  ensureAuthenticated, (req, res) => userController.getAccount(req, res));
router.delete("/:id",  ensureAuthenticated,   (req, res) => userController.deleteAccount(req, res));

// restrictTo,

module.exports = router;








