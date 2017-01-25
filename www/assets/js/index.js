var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/

  }
};

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
  dynamicNavbar: true,
  domCache: true
});

var profileView = myApp.addView('#tab3', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

var popoverView = myApp.addView('.popover-view');

//API
var apiUrl = 'http://www.kashew.tecnologia.ws/agendamacom/';
var storage = window.localStorage;

calendarView.router.loadPage('views/login.html');


/* navigator.splashscreen.show();
window.setTimeout(function () {
  //myApp.loginScreen();
  calendarView.router.loadPage('views/login.html');
    $$('.views').removeAttr('style');
  //navigator.splashscreen.hide();
}, 2500); */
