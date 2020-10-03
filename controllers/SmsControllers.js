const accountSid = 'AC81ac3c3a0ad1049121fe5dce78df5cdb'; 
const authToken = '791ec6868095be28c6e978adae76908d'; 
const client = require('twilio')(accountSid, authToken); 
const Sms = require("../models/smsModel")

class SmsController {
//SEND SMS
    async createSms(req, res){ 
        const {body, from, to,} = req.body;
    client.messages 
      .create({ 
         body,
         from,      
         to,
       }) 
      .then(message => console.log(message.sid)) 
      .done();

      //SAVE SMSES TO DATABASE
      const newSms = new Sms({
        body,   
        from,
        to,
             
      });
  const savedSms = await newSms.save();
  res.json(savedSms);

}
}
module.exports = SmsController;

