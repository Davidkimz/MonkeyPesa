const mongoose = require("mongoose");


const changePasswordRequestSchema = new mongoose.Schema({
    email: { 
        type: String,
         required: true, 
         unique: true },
       
    code: { type: String,
        required: true,
        required: true},   
});


module.exports = ChangePasswordRequest = mongoose.model("changePasswordRequest", changePasswordRequestSchema);
