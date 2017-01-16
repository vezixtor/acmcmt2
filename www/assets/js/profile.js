myApp.onPageBack('editProfile', function (page) {
	myApp.showToolbar('.toolbar');
});
myApp.onPageBack('editProfile', function (page) {
	myApp.showToolbar('.toolbar');
});

setProfile();

function setProfile() {
	var storeData = JSON.parse(storage.getItem('user'));
  $$('#userName').text(storeData.name);
  $$('#userEmail').text(storeData.email);
  $$('#userCim').text(storeData.cim);
  $$('#userBirth').text(storeData.birth);
  $$('#userPhone').text(storeData.phone);
  $$('#userPosition').text(storeData.position);
  $$('#userProfession').text(storeData.profession);
  $$('#userStore').text(storeData.store);
  $$('#userType').text(storeData.type);

  $$('#userEmailFull').text('Email: ' + storeData.email);
  $$('#userCimFull').text('CIM: ' + storeData.cim);
  $$('#userBirthFull').text('Data de Nascimento: ' + storeData.birth);
  $$('#userPhoneFull').text('Celular: ' + storeData.phone);
}

$$('.popover').on('open', function (e) {
	$$('#editProfile').on('click', function() {
		profileView.router.loadPage('views/edit-profile.html');
		myApp.hideToolbar('.toolbar');
		myApp.closeModal('.popover');
	});

	$$('#createStore').on('click', function() {
		profileView.router.loadPage('views/create-store.html');
		myApp.hideToolbar('.toolbar');
		myApp.closeModal('.popover');
	});
});

//TODO: Edit Profile
myApp.onPageInit('editProfile', function(page){
	var storeData = JSON.parse(storage.getItem('user'));
  $$('#userName').val(storeData.name);
  $$('#userEmail').val(storeData.email);
  $$('#userCim').val(storeData.cim);
  $$('#userBirth').val(dateAdjust(storeData.birth));
  $$('#userPhone').val(storeData.phone);
  $$('#userPosition').val(storeData.position);
  $$('#userProfession').val(storeData.profession);
  $$('#userStore').val(storeData.store);
  $$('#userType').val(storeData.type);
});

function dateAdjust(data){
	return data.substring(6,10) + '-' + data.substring(3,5) + '-' + data.substring(0,2);
}
