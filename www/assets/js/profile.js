myApp.onPageBack('editProfile', function (page) {
	myApp.showToolbar('.toolbar');
});
myApp.onPageBack('createStore', function (page) {
	myApp.showToolbar('.toolbar');
});


var userData = JSON.parse(storage.getItem('user'));
var id = userData.id;
console.log(id);

setProfile();

function setProfile() {
	$$.each(userData, function (index, data) {
		console.log(data.id);
    if(id == data.id){
		  $$('#userName').text(userData.name);
		  $$('#userEmail').text(userData.email);
		  $$('#userCim').text(userData.cim);
		  $$('#userBirth').text(userData.birth);
		  $$('#userPhone').text(userData.phone);
		  $$('#userPosition').text(userData.position);
		  $$('#userProfession').text(userData.profession);
		  $$('#userStore').text(userData.store);
		  $$('#userType').text(userData.type);

		  $$('#userEmailFull').text('Email: ' + userData.email);
		  $$('#userCimFull').text('CIM: ' + userData.cim);
		  $$('#userBirthFull').text('Data de Nascimento: ' + userData.birth);
		  $$('#userPhoneFull').text('Celular: ' + userData.phone);
		}
	});

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
  $$('#editName').val(storeData.name);
  $$('#editEmail').val(storeData.email);
  $$('#editCim').val(storeData.cim);
  $$('#editBirth').val(dateAdjust(storeData.birth));
  $$('#editPhone').val(storeData.phone);
  $$('#editPosition').val(storeData.position);
  $$('#editProfession').val(storeData.profession);
  $$('#editStore').val(storeData.store);
  $$('#editType').val(storeData.type);
});

function dateAdjust(data){
	return data.substring(6,10) + '-' + data.substring(3,5) + '-' + data.substring(0,2);
}

//TODO: Create store
myApp.onPageInit('createStore', function(page){
	var storeData = JSON.parse(storage.getItem('store'));
	$('#createHour').mask('00:00');
});
