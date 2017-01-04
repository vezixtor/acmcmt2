var storage = window.localStorage;

$$('#login').on('click', function() {
	var storedData = myApp.formGetData('login-form');
	if(storedData) {
		console.log(JSON.stringify(storedData));
    login(JSON.stringify(storedData));
	}
	else {
		console.log('Erro')
	}
});

function login(storedData){
  $$.post(apiUrl + 'login.php', storedData, function (data) {
    console.log(data);
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

  $$(document).on('ajax:complete', function (e) {
    myApp.hideIndicator();
  });

}
