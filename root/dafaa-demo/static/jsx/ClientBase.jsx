import  SignupForm from './SignupForm';
import  LoginForm from './LoginForm';
import  RequestChangePasswordForm from './RequestChangePasswordForm';

import React from 'react';
import ReactDOM from 'react-dom/client';




const user_details_form = document.getElementById("user_details_form");



const NForms = () => {
  return (
    <div>
      <SignupForm/>
      <LoginForm/>
      <RequestChangePasswordForm/>
    </div>
  );
};



window.showSignupForm = function () {
  close_all_forms();
  var modal = new bootstrap.Modal(document.getElementById('Signup_Form'));
  modal.show();

}

window.hideSignupForm = function () {
  var modalElement = document.getElementById('Signup_Form');
  var modal = bootstrap.Modal.getInstance(modalElement); 
  if (modalElement.classList.contains('show')) {
      modal.hide();
  }
}



window.showLoginForm = function() {
  close_all_forms();
  var modalElement = document.getElementById('Login_Form');
  var modal = new bootstrap.Modal(modalElement);
  modal.show();
  
}

window.hideLoginForm = function() {
  var modalElement = document.getElementById('Login_Form');
  var modal = bootstrap.Modal.getInstance(modalElement); 
  if (modalElement.classList.contains('show')) {
      modal.hide();
  }
}



window.showRequestChangePasswordForm = function () {
  close_all_forms();
  var modal = new bootstrap.Modal(document.getElementById('RequestChangePassword_Form'));
  modal.show();

}

window.hideRequestChangePasswordForm = function () {
  var modalElement = document.getElementById('RequestChangePassword_Form');
  var modal = bootstrap.Modal.getInstance(modalElement); 
  if (modalElement.classList.contains('show')) {
      modal.hide();
  }
}



function close_all_forms() {
  
  window.hideLoginForm();
  window.hideSignupForm();
  window.hideRequestChangePasswordForm();
};


function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
ReactDOM.createRoot(document.getElementById("NForms")).render(
  <NForms></NForms>
);