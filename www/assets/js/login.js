myApp.onPageInit('login', function (page) {
	$$('.toolbar').hide();
	$$('.navbar').show();

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
			setProfile();

			$$.getJSON(apiUrl + "user.php", function (data) {
				storage.setItem('userAll', JSON.stringify(data));
			});

			myApp.showIndicator()
  		setTimeout(function () {
				myApp.showTab('#tab1');
				$$('.toolbar').show();
				createCalendar();
				checkStore();
      	myApp.hideIndicator();
  		},1000);

			var userData = JSON.parse(storage.getItem('user'));
			console.log(userData);
      //splashView.router.back();
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
		myApp.showTab('#tab1');
		$$('.toolbar').show();
		createCalendar();
		checkStore();
    };
  },
    function (xhr, status){console.log(xhr, status)}
  );
}
