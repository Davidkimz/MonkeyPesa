const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: { type: String , trim: true, required: [true, 'First name is required*']},
    lastName:  { type: String, trim: true, },
    email: { type: String, unique: true},
    role:  { type: String },
    tags:  { type: String },
    company:  { type: String },
    phoneNumber:  { type: String },
    website:  { type: String },
    address: { type: String },
    city:  { type: String },
    zipCode:  { type: String },
    country:  { type: String },
    addedDate: { type: Date, default: Date.now()}
});

module.exports = Contact = mongoose.model("Contact", contactSchema);
