myApp.onPageAfterBack('editProfile', function (page) {
  setProfile();
});

myApp.onPageInit('editProfile', function (page) {
  var userData = JSON.parse(storage.getItem('user'));

  $$('#editEmail').val(userData.email);
  if(userData.birth.substring(0,4) > 1000){
    $$('#editBirth').val(userData.birth);
  }else{
    console.log(userData.birth);
    $$('#editBirth').val(serverBirth(userData.birth));
  }
  $('#editPhone').val(userData.phone).mask('+00 00 00000-0000');
  $$('#editName').val(userData.name);
  $$('#editPosition').val(userData.position);
  $$('#editProfession').val(userData.profession);

  $$('#updateProfile').on('click', function() {
    var formUser = myApp.formToData('#editProfile-form');
    if(formUser) {
      formUser.cim = userData.cim;
      formUser.type = userData.type;
      formUser.store = userData.store;
      formUser.id = userData.id;
      formUser.admin_store = userData.admin_store;
      updateProfile(JSON.stringify(formUser));
    }
    else {
      console.log(JSON.stringify(formUser))
    }
  });
});

function serverBirth(dataServer){
	return dataServer.substring(6,10) + '-' + dataServer.substring(3,5) + '-' + dataServer.substring(0,2);
}

function updateProfile(formUser){
  $$.post(apiUrl + 'user_update.php', formUser, function (data) {
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
      storage.setItem('user', formUser);
      setProfile();
      $$.getJSON(apiUrl + 'user.php', function (data) {
				storage.setItem('userAll', JSON.stringify(data));
			});
      profileView.router.back();
    }
  });
}
