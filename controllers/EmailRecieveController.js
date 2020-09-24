const nodeMailin = require("node-mailin");



class EmailRecieverControllers {
        async receiveMail(req, res){
            nodeMailin.start({
                port: 25
              });

    /* Access simplesmtp server instance. */
    nodeMailin.on("authorizeUser", function(connection, username, password, done) {
    if (username == "johnsmith" && password == "mysecret") {
      done(null, true);
    } else {
      done(new Error("Unauthorized!"), false);
    }
  });
    

     /* Event emitted when the "From" address is received by the smtp server. */
    nodeMailin.on('validateSender', async function(session, address, callback) {
    if (address == 'foo@bar.com') { /*blacklist a specific email adress*/
        err = new Error('You are blocked'); /*Will be the SMTP server response*/
        err.responseCode = 530; /*Will be the SMTP server return code sent back to sender*/
        callback(err);
    } else {
        callback()
    }
    });

    /* Event emitted when the "To" address is received by the smtp server. */
nodeMailin.on('validateRecipient', async function(session, address, callback) {
    console.log(address) 
    /* Here you can validate the address and return an error 
     * if you want to reject it e.g: 
     *     err = new Error('Email address not found on server');
     *     err.responseCode = 550;
     *     callback(err);*/
    callback()
});
 
/* Event emitted when a connection with the Node-Mailin smtp server is initiated. */
nodeMailin.on("startMessage", function(connection) {
  /* connection = {
      from: 'sender@somedomain.com',
      to: 'someaddress@yourdomain.com',
      id: 't84h5ugf',
      authentication: { username: null, authenticated: false, status: 'NORMAL' }
    }
  }; */
  console.log(connection);
});
 
/* Event emitted after a message was received and parsed. */
nodeMailin.on("message", function(connection, data, content) {
  console.log(data);
  /* Do something useful with the parsed message here.
   * Use parsed message `data` directly or use raw message `content`. */
});
 
nodeMailin.on("error", function(error) {
  console.log(error);
});
//Rejecting an incoming email
//You can reject an incoming email when the validateRecipient or validateSender event gets called and you run the callback with an error (Can be anything you want, preferably an actual SMTP server return code)

nodeMailin.on('validateSender', async function(session, address, callback) {
    if (address == 'foo@bar.com') {         /*blacklist a specific email adress*/
        err = new Error('Email address was blacklisted'); /*Will be the SMTP server response*/
        err.responseCode = 530;             /*Will be the SMTP server return code sent back to sender*/
        callback(err);                      /*Run callback with error to reject the email*/
    } else {
        callback()                          /*Run callback to go to next step*/
    }
});
 }
}