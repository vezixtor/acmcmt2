// Initialize app
var myApp = new Framework7({
  fastClicks: false
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

//API
var apiUrl = 'http://www.kashew.tecnologia.ws/agendamacom/';

$$('.panel-close').on('click', function (e) {
  myApp.closePanel();
});
