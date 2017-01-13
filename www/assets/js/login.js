myApp.onPageInit('login', function (page) {
	$$('.toolbar').hide();

	$$('#login').on('click', function() {
		var storedData = myApp.formToData('#login-form');
		if(storedData) {
	    login(JSON.stringify(storedData));
		}
		else {
			console.log(JSON.stringify(storedData));
		}
	});
});

function login(storedData){

  $$.post(apiUrl + 'login.php', storedData, function (data) {
    var objeto = JSON.parse(data);
    if(objeto.success == 1){
			storage.setItem('user', data); // Pass a key name and its value to add or update that key.
      calendarView.router.back();
			$$('.toolbar').show();
    }else{
			iziToast.show({
    		title: 'ERRO',
    		message: objeto.message,
        backgroundColor: '#EFEFEF',
        titleColor: 'red',
        timeout: 1500,
        animateInside: true,
        position: 'center'
			});
      /*myApp.addNotification({
        title: 'ERRO',
        message: objeto.message
      });*/
	  calendarView.router.back();
		$$('.toolbar').show();
    };
  },
    function (xhr, status){console.log(xhr, status)}
  );

	$$.getJSON(apiUrl + 'stores.php', function (data) {
		storage.setItem('stores', JSON.stringify(data))
	});

	$$.getJSON(apiUrl + 'events.php', function (data) {
		storage.setItem('events', JSON.stringify(data));
	});
}
