function login(){

}

$$('#login').on('click', function() {
	var storedData = myApp.formGetData('login-form');
	if(storedData) {
		console.log(JSON.stringify(storedData));
	}
	else {
		console.log('Deu ruim')
	}
});


myApp.onPageInit('index', function (page) {
  $$('#login').on('click', function() {
    console.log("login");
  });
})
