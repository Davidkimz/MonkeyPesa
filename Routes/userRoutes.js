const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/auth')
const checkLogin= require("../middleware/checkLogin")
const restrictTo = require("../middleware/restrictRoute")


const UserController = require("../controllers/userControllers")
const userController = new UserController();

const  resetPasswordController = require("../controllers/ChangePasswordRequestController")



//GETALL ROUTE
router.get("/", checkLogin, async (req, res) => {

    userController.getAllAccounts(req, res)
    .then(data => {

        res.render('../views/pages/users.ejs', {
            title: "Add User",
            action: "users/register",
            fields: [
                {label:'Name', name:'displayName', type:'text', property:'required'},
                {label:'Email', name:'email', type:'text', property:'required'},
                {label:'Password', name:'password', type:'password', property:'required'},
                {label:'Repeat Password', name:'passwordCheck', type:'password', property:'required'},
                {label:'Role', name:'role', type:'text', property:'required'},
                {label:'Website', name:'website', type:'text'}
            ],
            data: data
        });
       
    }).catch(err => console.error(err));

});


//REGISTER ROUTE
router.get("/register", (req, res) => {
    res.render('../views/pages/register.ejs');
});

router.post("/register", (req, res) => userController.register(req, res));

//LOGIN
router.get("/login", (req, res) => {
    res.render('../views/pages/login.ejs', {message : req.flash('msg')});
});
router.post("/login", (req, res) => userController.login(req,res));

//Delete account(on a private route allows you delete only your account)
router.delete("/delete", checkLogin, (req, res) => userController.deleteUser(req, res))

//End point to verify if user is logged in.
router.post("/tokenIsValid", (req, res) => userController.isTokenValid(req,res))


//Forget password and reset
router.get("/forgot-password", (req,res) => resetPasswordController.forgotPassword(req, res))
router.put("/forgot-password", (req,res) => resetPasswordController.forgotPassword(req, res))

//Logout
router.get("/logout", (req,res) => userController.logout(req, res))

router.get("/:id",  checkLogin, (req, res) => userController.getAccount(req, res));
router.delete("/:id",  checkLogin,   (req, res) => userController.deleteAccount(req, res));

// restrictTo,

module.exports = router;








