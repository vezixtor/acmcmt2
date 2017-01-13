// Initialize app
var myApp = new Framework7({
  fastClicks: false,
  swipeBackPage: false
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

app.initialize();
// Add view
var mainView = myApp.addView('#tab1', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

//API
var apiUrl = 'http://www.kashew.tecnologia.ws/agendamacom/';

$$('.botao-qualquer').on('click', function () {
  //myApp.loginScreen();
  //$$('.some-view').show();
	$$('.tabs-animated-wrap').hide();
			$$('.toolbar').hide();
});

myApp.onPageInit('login-screen', function (page) { console.log('opa');
  var pageContainer = $$(page.container);
  pageContainer.find('.list-button').on('click', function () {
    var username = pageContainer.find('input[name="username"]').val();
    var password = pageContainer.find('input[name="password"]').val();
    // Handle username and password
    myApp.alert('Username: ' + username + ', Password: ' + password, function () {
      mainView.goBack();
    });
  });
});
