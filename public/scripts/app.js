
//toggle register form
$(() => {
  $('#register-button').click(() => {
    if ($('#register-form-id').hasClass('register-form')) {
      $('#register-form-id').slideUp('slow').toggleClass('register-form');
    } else {
      $('#register-form-id').slideDown('slow').toggleClass('register-form');
    }
  });
});

// toggle login form
$(() => {
  $('#login-button').click(() => {
    if ($('#login-form-id').hasClass('login-form')) {
      $('#login-form-id').slideUp('slow').toggleClass('login-form');
    } else {
      $('#login-form-id').slideDown('slow').toggleClass('login-form');
    }
  });
});


