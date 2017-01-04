var storage = window.localStorage;

$$('#login').on('click', function() {
	var storedData = myApp.formToData('#login-form');
	if(storedData) {
		console.log(JSON.stringify(storedData));
    login(JSON.stringify(storedData));
	}
	else {
		console.log(JSON.stringify(storedData));
	}
});

function login(storedData){
  $$.post(apiUrl + 'login.php', storedData, function (data) {
    storage.setItem('user', data) // Pass a key name and its value to add or update that key.
    var objeto = JSON.parse(data);
    if(objeto.success == 1){
      mainView.router.loadPage('views/dashboard.html');
    }else{
      myApp.addNotification({
        title: 'ERRO',
        message: objeto.message
      });
	  mainView.router.loadPage('views/dashboard.html');
    };
  },
    function (xhr, status){console.log(xhr, status)}
  );

	$$.getJSON(apiUrl + 'stores.php', function (data) {
		storage.setItem('stores', JSON.stringify(data))
	});

}
