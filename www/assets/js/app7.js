// Initialize app
var myApp = new Framework7({
  fastClicks: false,
  swipeBackPage: false
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

app.initialize();

// Add view
var calendarView = myApp.addView('#tab1', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

var storesView = myApp.addView('#tab2', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

var profileView = myApp.addView('#tab3', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

//API
var apiUrl = 'http://www.kashew.tecnologia.ws/agendamacom/';
var storage = window.localStorage;
