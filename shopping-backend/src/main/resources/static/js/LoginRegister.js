function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirmpassword");
  const message = document.getElementById("message");
  const myButton = document.getElementById("myButton");
  const passwordMessage = document.getElementById("pswdmessage");

  passwordField.addEventListener("input", function () {
      const password = passwordField.value;

      if (password.length >= 6) {
          passwordMessage.style.display="none"

          confirmPasswordField.addEventListener("input", function () {
          const passwordValue = passwordField.value;
          const confirmPasswordValue = confirmPasswordField.value;

          if (passwordValue === confirmPasswordValue) {
              message.style.display="none"
              myButton.disabled = false;
              myButton.style.cursor = "pointer"
          } else {
              message.style.display="block"
              message.textContent = "Passwords do not match";
              message.style.color = "white";
              myButton.disabled = true;
              myButton.style.cursor = "not-allowed"
          }
      });
          
      } else {
          passwordMessage.style.display="block"
          passwordMessage.textContent = "Password must contain 6+ characters";
          passwordMessage.style.color = "white";
          myButton.disabled = true
          myButton.style.cursor = "not-allowed"
      }
  });
});

$(document).ready(function(){
  $(".alert").fadeOut(10000);
});

$(document).ready(function(){
  $(".messages").fadeOut(7000);
});
