class HomeController {
    // This display the home page/landing page
    index(req, res) {
      res.render('home/index');
    }
  
    about(req, res) {
      res.render('home/about');
    }
  
    contact(req, res) {
      res.render('home/contact');
    }
  
   
  }
  
  module.exports = new HomeController();
  