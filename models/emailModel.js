
const mongoose = require("mongoose");


const emailSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true,        
         },
       
    lastname: { type: String,
        required: true},
     
    email: { type: String },

    message: { 
        type: String }
    
    });



module.exports = Email = mongoose.model("Email", emailSchema);
