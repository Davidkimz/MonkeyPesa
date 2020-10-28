const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findById } = require("../models/userModel");
const assert = require("assert");
const setSession = require('../middleware/session');
  
class UserController {

    //REGISTER NEW uSER
async register(req, res) { 

    try {
        let {email, password, role,  passwordCheck, displayName, website } = req.body;

    //Validation-check
        //all fields have been filled
    if(!email || !password || !passwordCheck){
        return res.status(400).json({msg: "Not all fields have been entered"})
    }
        //password to be atleast 5 characters long
    if(password.length < 5) 
    return res.status(400)
    .json({msg: "Password must be atleast 5 characters"})
        //password comparission 
    if(password != passwordCheck)
    return res.status(400)
    .json({msg: "Password Do not match"});

        //find user with email
    const existingUser = await  User.findOne({email: email});
    if (existingUser)
    return res
        .status(400)
        .json({msg: "An account with this email already exist"})
     if( !displayName ) displayName = email;

 
        // hashing User password
   const salt = await bcrypt.genSalt(10);
   const passwordHash = await bcrypt.hash(req.body.password, salt);
   req.body.password = passwordHash;
        //saving user to the database
    const newUser = new User({
        email,
        password: passwordHash,
        displayName,
        role,
        website,
    });
    await newUser.save();
    res.redirect('/sales');
   
    //Catching errors
    } catch(err){
        res.send("recieved your request!");
        res.status(500).json({ error: err.message})
    }

}

//GET ALL ACCOUNTS
async getAllAccounts(req, res) {
    try {
        const user =   await User.find();

        //send response
        return user;
    } catch(err){
        return res.status(500).json({ error: err.message})
    }
}
//GET ONE ACCOUNT
async getAccount(req, res){
    try {
      const user =  await User.findById(req.params.id);
      res.status(200).json(user)
    } catch (err) {
       res.status(500).json({ error: err.message})
    }
}



//DELETE ONE  ACONTACT
async deleteAccount(req, res){
    try {
        await User.findByIdAndDelete(req.params.id)
           return res.status(400).json({msg: `User account has been deleted`})

    } catch(err){
       res.status(404).json({ error: err.message})
    }
}



//LOGIN USER
 async login(req, res) {
     
    try{
        //Login Validation
        const {email, password, role} = req.body;
        if(!email || !password){
            req.flash('msg', "Not all fields have been entered");
            return res
            .status(400)
            .json({msg: "Not all fields have been entered"})
        }
        

    
        //Validate password we enter and users password
        const user = await User.findOne({  email: email})
        if(!user)
        return res
        .status(400)
        .json({msg: "No account with this email has been registered"})
        //Validate if users password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            req.flash('msg', "Invalid Credentials");
            return res
            .status(400)
            .json({msg: "Invalid Credentials"});
        }
    
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        req.session.token = token;

        res.redirect('/sales');
    } catch(err){
        res.status(500).json({error: err.message});
    }
    };

//DELETE  USER
async deleteUser(req, res){
        try {
         const deletedUser = await User.findByIdAndDelete(req.user);
         res.json(deletedUser);
         
        } catch(err){
         res.status(500).json({error: err.message});
        }
     }
//CHECK IF TOKEN IS VALID
async isTokenValid(req, res){  
        try {
            const token = req.header("x-auth-token");
            if(!token) return res.json(false);
    
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            if(!verified) return res.json(false);
    
            const user = await User.findById(verified.id);
            if(!user) return res.json(false);   
            return res.json(true); 
        }catch(err){
            res.status(500).json({error: err.message});
           }
    }
    

     logout(req, res) {
        req.session.token = "";
        res.redirect('/');
      }


    // This displays the Corresponding pages
    users(req, res) {
        res.render('../views/pages/users.ejs', res);
      }
    
}

module.exports = UserController;