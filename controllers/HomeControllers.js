var url = require('url');
var fs = require('fs');

class HomeController {
    // This display the home page/landing page
    index(req, res) {
      res.render('index');
    }
  
    about(req, res) {
      res.render('home/about');
    }
  
    contact(req, res) {
      returnHtml('./../contacts.html', res);
    }
  
   
  }

  
  //Call Html Pages
  function returnHtml(filepath, res){
      res.writeHead(200, {'Content-Type': 'text/html'});
      fs.readFile(filepath, null, function(error, data){
        if (error){
            res.writeHead(404);
            res.write('File not found');
        } else {
            res.write(data);
        }
        res.end();
      });
  }
  
  module.exports = new HomeController;
  