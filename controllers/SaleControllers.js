var url = require('url');
var fs = require('fs');

class SaleController {
    // This display the sales corresponding pages
    sales(req, res) {
        res.render('../views/pages/sales.ejs', res);
    }

    list(req, res) {
        res.render('../views/pages/lists.ejs', res);
    }
  
  }
  
  module.exports = SaleController;
  