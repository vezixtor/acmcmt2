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

$$('#settings').on('click', function() {
  myApp.showTab('#tab1');
});
