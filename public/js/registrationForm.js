$("#registerHere").click(function(){
  $("#registrationForm").removeClass("hide");
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
