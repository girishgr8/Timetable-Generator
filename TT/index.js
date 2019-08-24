if (document.readyState == 'complete') {
  function validateUsername () {
    var pswd = document.getElementById ('password-field');
    var email = document.getElementById ('email-field');
    alert (pswd, email);
  }
}

function myFunction () {
  var x = document.getElementById ('password-field');
  var email = document.getElementById ('email-field');
  console.log ('printing email = ', email);
  if (x.type === 'password') {
    x.type = 'text';
  } else {
    x.type = 'password';
  }
}
