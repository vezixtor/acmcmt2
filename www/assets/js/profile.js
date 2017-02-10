setProfile();
var idUser;

function setProfile() {
	var userData = JSON.parse(storage.getItem('user'));
	if(userData){
		idUser = userData.id;
	  $$('#userName').text(userData.name);
	  $$('#userEmail').text(userData.email);
	  $$('#userCim').text(userData.cim);
		if(userData.birth.substring(0,4) > 1000){
			$$('#userBirth').text(adjustBirth(userData.birth));
		}else{
			$$('#userBirth').text(userData.birth);
		}
	  $$('#userPhone').text(userData.phone);
	  $$('#userPosition').text(userData.position);
	  $$('#userProfession').text(userData.profession);
	  $$('#userStore').text(userData.store);
	  $$('#userType').text(userData.type);

	  $$('#userEmailFull').text('Email: ' + userData.email);
	  $$('#userCimFull').text('CIM: ' + userData.cim);
		if(userData.birth.substring(0,4) > 1000){
			$$('#userBirthFull').text('Data de Nascimento: ' + adjustBirth(userData.birth));
		}else{
			$$('#userBirthFull').text('Data de Nascimento: ' + userData.birth);
		}
	  $$('#userPhoneFull').text('Celular: ' + userData.phone);
	}
}

function adjustBirth(data){
	return data.substring(8,10) + '-' + data.substring(5,7) + '-' + data.substring(0,4);
}

$$('#iconLogout').on('click', function () {
	storage.clear();
	$$.getJSON(apiUrl + 'stores.php', function (data) {
    storage.setItem('stores', JSON.stringify(data));
    getLojas();
    setLojas();
  });

  $$.getJSON(apiUrl + 'events.php?type=store', function (data) {
    storage.setItem('events', JSON.stringify(data));
  });

  $$.getJSON(apiUrl + "events.php?type=personal", function (data) {
    storage.setItem('eventsPersonal', JSON.stringify(data));
  });

  $$.getJSON(apiUrl + "events.php?type=holiday", function (data) {
    storage.setItem('eventsHoliday', JSON.stringify(data));
  });
	myApp.showTab('#tab0');
	$$('.toolbar').hide();
	$$('.navbar').show();
	//profileView.router.loadPage('views/login.html');
});

$$('#profilePopover').on('click', function () {
	var clickedLink = this;
	myApp.popover('.popover-menu', clickedLink);

	$$('#editProfile').on('click', function() {
		profileView.router.loadPage('views/edit-profile.html');
		myApp.closeModal('.popover');
	});

	$$('#createStore').on('click', function() {
		profileView.router.loadPage('views/create-store.html');
		myApp.closeModal('.popover');
	});

	$$('#updatePassword').on('click', function() {
		profileView.router.loadPage('views/edit-password.html');
		myApp.closeModal('.popover');
	});
});

function setLojas(data) {
  $$('#lista-profile').empty();
  var storeData = JSON.parse(storage.getItem('stores'));
	var userData = JSON.parse(storage.getItem('user'));
	var userStore = [];
	userStore = userData.store.split(',');
	var userLength = userStore.length;
	var x = 0;
	while(x < userLength){
		var index = storeData.map(function(e) { return e.id; }).indexOf(userStore[x]);
		var data = storeData[index];
		inputStore(storeData[index]);
		x++;
	}

}

function inputStore(data) {
  var layoutDaLista =
    '<li>' +
      '<a href="views/store.html?id='+ data.id +'" class="item-link item-content">' +
        '<div class="item-media"><img src="http://lorempixel.com/80/80/city/'+ randomBetween(1, 10) +'" width="80"></div>' +
        //'<div class="item-media"><img src="http://placehold.it/200.png/0000bb" width="80"></div>' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">'+ data.name +'</div>' +
            //'<div class="item-after">'+ store.hour +'</div>' +
          '</div>' +
          '<div class="item-subtitle">'+ data.address +', '+ data.number +'</div>' +
          '<div class="item-text">'+ data.city +', '+ data.uf +'</div>' +
        '</div>' +
      '</a>' +
    '</li>';
  $$('#lista-profile').append(layoutDaLista);
}
function randomBetween(x, y) {
  //Generate random number between two numbers in JavaScript TODO
  return Math.floor(Math.random() * y) + x;
}
