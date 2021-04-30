/**
* PHP Email Form Validation - v3.0
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      console.log(thisForm)

      let action = "/sendMail";
      //let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      //let formData = new FormData( thisForm );
      let name = document.querySelector(".name-email").value
      let email = document.querySelector(".emailid-email").value
      let subject = document.querySelector(".subject-email").value
      let body = document.querySelector(".body-email").value

      let formData = {
         name : name,
         email : email,
         subject : subject,
         body : body
      }

      console.log(formData)

      node_email_form_submit(thisForm,action,formData)
    });
  });

  function node_email_form_submit(thisForm, action, formData) {
     $.ajax({
          type: 'POST', url: action, data: formData,
        }).done(function(res) {
              thisForm.querySelector('.loading').classList.remove('d-block');
              if (res.success == true) {
                thisForm.querySelector('.sent-message').classList.add('d-block');
                thisForm.reset(); 
              } else {
                displayError(thisForm,Error(res ? res : 'Form submission failed and no error message returned from: ' + action))
                //throw new Error(res ? res : 'Form submission failed and no error message returned from: ' + action); 
              }
        }).fail(function(jqXHR, textStatus){
             displayError(thisForm,Error('API request Failed | mailing service down status:'+textStatus))
        })
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
