



class ContactController {
//CREATE NEW CONTACT
    async createContact(req, res) { 
         try {
        let {
            firstName, lastName, email, role, tags,
             company, phoneNumber, website, address, 
            city, zipCode, country
             } = req.body; 

    if(!firstName || !lastName || !email, !role || !tags || !company || !phoneNumber || !website || !address || !city || !zipCode || !country){
        return res.status(400).json({msg: "Not all fields have been entered"})
    }

    //find user with email
    const existingContact = await  User.findOne({email: email});
    if (existingContact)
    return res
        .status(400)
        .json({msg: "An user with this contact already exist"})
    

  //SAVE CONTACT TO DATABASE
    const newContact = new Contact({
        firstName,
        lastName,
        email,
        role,
        tags,
        company,
        phoneNumber,
        website,
        address,
        city,
        zipCode,
        country,
    });

    const savedContact = await newContact.save();
    res.redirect('/contacts');

    //Catching errors
    } catch(err){
        res.status(500).json({ error: err.message})
    }
 }
//GET ALL CONTACTS
    async getAllContacts(req, res) {
        try {
            //build query
            const queryObj = { ...req.query};
            const excludedFields  = ['page', 'sort', 'limit', 'fields'];
            excludedFields.forEach(el => delete queryObj[el])
    

            const query =   await Contact.find(queryObj);
            //execute query
            const contacts = await query

            //send response
            return contacts;
        } catch(err){
            res.status(500).json({ error: err.message})
        }
    }
//GET ONE CONTACT
     async getContact(req, res){
         try {
           const contact =  await Contact.findById(req.params.id);
           res.status(200).json(contact)
         } catch (err) {
            res.status(500).json({ error: err.message})
         }
     }
//UPDATE ONE CONTACT
     async updateContact(req, res){
        try {
            const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).json(contact)
        } catch (err){
            res.status(500).json({ error: err.message})
        }
     }


//DELETE ONE  ACONTACT
 async deleteContact(req, res){
     try {
         await Contact.findByIdAndDelete(req.params.id)
            return res.status(400).json({msg: `Contact has been deleted`})

     } catch(err){
        res.status(404).json({ error: err.message})
     }
 }
}

module.exports = ContactController;