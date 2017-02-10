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
var splashView = myApp.addView('#tab0', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

var calendarView = myApp.addView('#tab1', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  domCache: true
});

var storesView = myApp.addView('#tab2', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  domCache: true
});

var profileView = myApp.addView('#tab3', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  domCache: true
});

var popoverView = myApp.addView('.popover-view');

//API
var apiUrl = 'http://www.kashew.tecnologia.ws/agendamacom/';
var storage = window.localStorage;

$( document ).ready(function() {
  $$.getJSON(apiUrl + 'stores.php', function (data) {
    storage.setItem('stores', JSON.stringify(data));
    getLojas();
    setLojas();
  });

  $$.getJSON(apiUrl + 'events.php?type=store', function (data) {
    storage.setItem('events', JSON.stringify(data));
  });

  $$.getJSON(apiUrl + "events.php?type=personal", function (data) {
    storage.setItem('eventsPersonal', JSON.stringify(data));
  });

  $$.getJSON(apiUrl + "events.php?type=holiday", function (data) {
    storage.setItem('eventsHoliday', JSON.stringify(data));
  });

  var user = JSON.parse(storage.getItem('user'));
  splashView.router.loadPage('views/login.html');
  /*if(user != null && user.success != null){
    myApp.showTab('#tab1');
    $$('.navbar').show();
    $$('.toolbar').show();
    //createCalendar();
    checkStore();
  }else{
    splashView.router.loadPage('views/login.html');
  }*/
});


Date.prototype.getNextWeekMonday = function() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var d = new Date(firstDay);
    var diff = d.getDate() - d.getDay() + 5;
    return new Date(d.setDate(diff));
};

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

var check = true;
var date = new Date();
var dateLast = new Date();
date = date.getNextWeekMonday();
var lastDay = new Date(dateLast.getFullYear(), dateLast.getMonth() + 1, 0);
var i = 0;
while(check){
  if(date.addDays(7*i) <= lastDay){
    console.log(date.addDays(7*i));
  }else{
    check = false;
    console.log('Fim');
  }
  i++;
}
