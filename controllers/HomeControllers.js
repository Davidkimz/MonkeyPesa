var url = require('url');
var fs = require('fs');

class HomeController {
    // This display the home page/landing page
    index(req, res) {
      res.render('index');
    }
  
    about(req, res) {
      res.render('../views/pages/about.ejs', res);
    }
  
    contact(req, res) {
      res.render('../views/pages/contacts.ejs', res);
    }
  
   
  }

  
  module.exports = new HomeController;
  