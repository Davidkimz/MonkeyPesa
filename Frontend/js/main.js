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

    var email = document.getElementById('register-email').value;

    if (formname == 'register' || formname == 'login') { //Check For New User Registering or Login

        var password = document.getElementById('register-password').value;
        if (formname == 'register') {
          var name = document.getElementById('register-name').value;
          activateButton(name, email, password, 'register'); 
        } else {
          activateButton('', email, password, 'login'); 
        }

      } else {
        activateButton('', email, '', 'forgot'); //Reset Passowrd form
      }      
  }

  function activateButton(name, email, password, send){
    if(validateEmail(email) && send == 'forgot' || validateEmail(email) && password.length >=6 && send == 'login' ||
     name.length >=2 && validateEmail(email) && password.length >=6 && send == 'register')
        {
          $('.register').removeAttr('disabled');
        } 
      else
        {
          $('.register').prop('disabled',true);
        } 
  }

  //Finish Register, Login and Password form check for input

  //Sort Tables
  function sortTables(){
    $(document).ready(function () {
    $('#contacts-table').DataTables({
    "order": [[ 3, "desc" ]]
    });
    $('.dataTables_length').addClass('bs-select');
    });
  }