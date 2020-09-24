const nodemailer = require('nodemailer');
const Email = require("../models/emailModel")


class EmailControllers {
    async sendMail(req, res){
        let data = req.body
        let smtpTransport = nodemailer.createTransport({
            service:"gmail",
            port: 587,
            authentication: 'plain',
            auth:{
                user:"onencanemma9@gmail.com",
                pass:"Ehelisemmy90844#",
                secure: false
            }
        });

        let mailOption = {
            from: data.email,
            to: "onencanemma9@gmail.com",
            subject: `Message from ${data.name}`,
            html:

                `<div style="font-family: sans-serif">
                <h2>${data.subject}</h2>
                <h5>message from: ${data.lastname} ${data.name} </5>  
                <p>email: ${data.email} </p>
                <h3>Message</h3>
                
                <p>${data.message} </p>
                </div>
                   `
        };
    
        const {name, lastname, email, message} = req.body;
            //SAVE CONTACT TO DATABASE
            const newEmail = new Email({
                name,
                lastname,
                email,
                message,
               
            });
        const savedEmail = await newEmail.save();
        res.json(savedEmail);
        console.log(savedEmail)

 

        smtpTransport.sendMail(mailOption, (error, res) => {
           
            if(error){
                console.log(error)
            }else{
               console.log("Email has been sent.")
            }
        })

        smtpTransport.close()

    }
}


module.exports = EmailControllers;

