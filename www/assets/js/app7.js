// Initialize app
var myApp = new Framework7({
  fastClicks: false,
  swipeBackPage: false
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
