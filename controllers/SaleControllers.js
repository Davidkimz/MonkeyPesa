var url = require('url');
var fs = require('fs');

class SaleController {
    // This display the sales corresponding pages
    sales(req, res) {
        res.render('../views/pages/sales.ejs', res);
    }
  
    contact(req, res) {
        res.render('../views/pages/contacts.ejs', res);
    }

    list(req, res) {
        res.render('../views/pages/lists.ejs', res);
    }
  
   
  }
  
  module.exports = new SaleController;
  