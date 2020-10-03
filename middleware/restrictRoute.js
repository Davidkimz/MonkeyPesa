const User = require("../models/userModel")


restrictTo = (...roles) => { 
    return (req, res, next) => { 
        const user = ll
        if(!roles.includes(req.user.role)){
            return res                      
            .json({ msg: "You do not have permission to perform this action" })                
        }
        next();
    }  
 };

 module.exports = restrictTo

