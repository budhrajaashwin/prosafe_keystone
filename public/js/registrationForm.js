$("#registerHere").click(function(){
  $("#registrationForm").removeClass("hide");
  $("#loginForm").addClass("hide");
});

$("#signin").click(function(){
  $("#loginForm").removeClass("hide");
  $("#registrationForm").addClass("hide");
});
