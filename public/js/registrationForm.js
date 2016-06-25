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
  if (!$('#otp').hasClass('hide')) {
    var otpVerify = $.post('verify/otp', $('#registrationForm').serialize());
    otpVerify.done(function (data) {
      // $('input[type="text"]').val('');
      // $('#otp').removeClass('hide');
      location.reload(true);
      //alert("You've been registered with us");
    });
  } else {
    var registerAction = $.post('register', $('#registrationForm').serialize());
    registerAction.done(function (data) {
      // $('input[type="text"]').val('');
      $('#showOtpMsg').removeClass('hide');
      $('.removeInput').addClass('hide');
      $('#otp').removeClass('hide');
      //alert("You've been registered with us");
    });

    registerAction.fail(function (data) {
      alert(data.responseJSON.error);
      $("#loginForm").removeClass("hide");
      $("#registrationForm").addClass("hide");
    });
  }
});

$('#resendOtp').click(function () {
  var registerAction = $.post('resend/otp', $('#registrationForm').serialize());
  registerAction.done(function (data) {
    alert("OTP has been resent");
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
