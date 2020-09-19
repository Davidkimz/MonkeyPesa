const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: { 
        type: String,
         required: true, 
         unique: true },
       
    password: { type: String,
        required: true,
        minlength: 5,
        required: true},
    role: { type: String, 
        enum: [ "client", "employee", "admin"], 
        default:"client"},
    displayName: { 
        type: String }, 
    
    
},{timestamps: true})



module.exports = User = mongoose.model("User", userSchema);
