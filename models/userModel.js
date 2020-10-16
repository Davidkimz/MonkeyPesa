const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    displayName: { type: String }, 
    role: { type: String, 
             enum: [ "admin", "supervisor", "sales-person"], default:"sales-person"},
    email: { type: String, required: true, unique: true },   
    password: { type: String, required: true,  minlength: 5, required: true},
    website: { type: String },
    },{timestamps: true
    
    })
module.exports = User = mongoose.model("User", userSchema);
