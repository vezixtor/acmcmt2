myApp.onPageAfterBack('editPassword', function (page) {
  $$('.toolbar').show();
});
myApp.onPageInit('editPassword', function (page) {
  $$('.toolbar').hide();
  var userData = JSON.parse(storage.getItem('user'));
  var id = userData.id;

  $$('#btnUpdatePassword').on('click', function() {
    var formNewPassword = myApp.formToData('#editPassword-form');
    var password = formNewPassword.password;
    var passwordRepeat = formNewPassword.passwordRepeat;
    if(password == ''){
      iziToast.warning({
    		title: 'ERRO',
    		message: 'Senha em branco!',
        backgroundColor: '#EFEFEF',
        titleColor: '#F1C40F',
        timeout: 1500,
        animateInside: true,
        position: 'center'
			});
      console.log(JSON.stringify(formNewPassword));
    }else if(password != passwordRepeat){
      iziToast.warning({
    		title: 'ERRO',
    		message: 'Ambas senhas precisam ser iguais.',
        backgroundColor: '#EFEFEF',
        titleColor: '#F1C40F',
        timeout: 1500,
        animateInside: true,
        position: 'center'
			});
      console.log(JSON.stringify(formNewPassword));
    }else{
      formNewPassword.id = id;
      updatePassword(JSON.stringify(formNewPassword));
    }
  });
});

function updatePassword(formNewPassword, id){
  $$.post(apiUrl + 'user_pass_update.php', formNewPassword, function (data) {
    var objeto = JSON.parse(data);
    if(objeto.success == 0){
      iziToast.warning({
    		title: 'ERRO',
    		message: objeto.message,
        backgroundColor: '#EFEFEF',
        titleColor: '#F1C40F',
        timeout: 2500,
        animateInside: true,
        position: 'center'
			});
    }else{
      iziToast.success({
    		message: objeto.message,
        backgroundColor: '#EFEFEF',
        titleColor: 'blue',
        timeout: 2500,
        animateInside: true,
        position: 'center'
		  });
        profileView.router.back();
    }
  });
}
