$('#resetPasswordForm').submit(function (e) {
  var password = $('#password').val();
  var newPassword = $('#newPassword').val();
  if (password != newPassword) {
    alert('Passwords do not match');
    e.preventDefault();
  }
});
