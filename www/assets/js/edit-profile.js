myApp.onPageInit('editProfile', function (page) {
  var userData = JSON.parse(storage.getItem('user'));
  var id = userData.id;
  $('#editMobile').mask('+00 00 00000-0000');

  $$.each(userData, function (index, user) {
    if(id == user.id){
      $$('#editEmail').val(user.email);
      $$('#editBirth').val(dateAdjust(user.birth));
      $$('#editId').val(user.id);
      $('#editMobile').val(user.mobile).mask('+00 00 00000-0000');
      $$('#editName').val(user.name);
      $$('#editPosition').val(user.position);
      $$('#editProfession').val(user.profession);
      $$('#editId').val(user.id);
      $$('#edittyoe').val(user.type);
      $$('#editStore').val(user.store);
      $$('#editAdminStore').val(user.admin_store);
    }
  });

  $$('#updateProfile').on('click', function() {
    var formUser = myApp.formToData('#editProfile-form');
    if(formUser) {
      formUser.id = id;
      updateProfile(JSON.stringify(formUser));
    }
    else {
      console.log(JSON.stringify(formUser))
    }
  });
});

function dateAdjust(data){
	return data.substring(6,10) + '-' + data.substring(3,5) + '-' + data.substring(0,2);
}

function updateProfile(formUser){
  $$.post(apiUrl + 'user_update.php', formUser, function (data) {
    console.log(data);
    var objeto = JSON.parse(data);
    console.log(objeto);
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
    }
    $$.getJSON(apiUrl + 'user.php', function (data) {
      storage.setItem('user', JSON.stringify(data))
      profileView.back();
    });
  });
}
