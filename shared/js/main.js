/*!
 * Main Code Here
 * Copyright -2020 David the Author
 */

// Check User input on registration, login and password check forms 

  // Validate email input 

  function validateEmail(email) 
  {
      var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      return re.test(email);
  }

  function checkRegisterInput(formname){

    var email = document.getElementById('email').value;

    if (formname == 'register' || formname == 'login') { //Check For New User Registering or Login

        var password = document.getElementById('password').value;
        
        if (formname == 'register') {
          var passwordCheck = document.getElementById('passwordCheck').value;
          var displayName = document.getElementById('displayName').value;
          activateButton(displayName, email, password, passwordCheck, 'register'); 
        } else {
          activateButton('', email, password, '', 'login'); 
        }

      } else {
        activateButton('', email, '', '', 'forgot'); //Reset Passowrd form
      }      
  }

  function activateButton(displayName, email, password, passwordCheck, send){
    if(validateEmail(email) && send == 'forgot' || validateEmail(email) && password.length >=6 && send == 'login' ||
    displayName.length >=2 && validateEmail(email) && password.length >=6 && password == passwordCheck && send == 'register')
        {
          $('.register').removeAttr('disabled');
        } 
      else
        {
          $('.register').prop('disabled',true);
        } 
  }

  //Finish Register, Login and Password form check for input

