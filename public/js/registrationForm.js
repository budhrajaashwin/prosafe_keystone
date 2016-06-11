$("#registerHere").click(function(){
  $("#registrationForm").removeClass("hide");
  $("#loginForm").addClass("hide");
});

$("#forgotPassword").click(function(){
  $("#forgotForm").removeClass("hide");
  $("#loginForm").addClass("hide");
});

$("#signin").click(function(){
  $("#loginForm").removeClass("hide");
  $("#registrationForm").addClass("hide");
});

$('#registrationForm').submit(function (e) {
  e.preventDefault();
  var registerAction = $.post('register', $('#registrationForm').serialize());
  registerAction.done(function (data) {
    $('input[type="text"]').val('');
    alert("You've been registered with us, please verify your email to complete the process");
  });
});

$('#forgotForm').submit(function (e) {
  e.preventDefault();
  var registerAction = $.post('forgot', $('#forgotForm').serialize());
  registerAction.done(function (data) {
    $('input[type="text"]').val('');
    alert("We have sent you mail with a link to reset your password");
  });

  registerAction.fail(function () {
    alert('We could not find your email with us, please register with us');
  })
});
