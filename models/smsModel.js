
const mongoose = require("mongoose");


const smsSchema = new mongoose.Schema({
    from: { 
         type: String,
         required: true,        
         },
    to: { 
        type: String,
        },   
    body: { 
        type: String,
        required: true},   
    sentDate: { 
        type: Date, 
        default: Date.now()}
   
    },{timestamps: true
    
    });

module.exports = Sms = mongoose.model("Sms", smsSchema);
