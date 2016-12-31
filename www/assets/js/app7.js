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

//dashboard.html
var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro' , 'Outubro', 'Novembro', 'Dezembro'];
var semanaNomes = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
var eventos =  [
  new Date(2016, 11, 25),
  new Date(2017, 0, 1)
];
myApp.onPageInit('dashboard', function (page) {

  var calendarInline = myApp.calendar({
    container: '#calendar-inline-container',
    value: [new Date()],
    weekHeader: true,
    dayNamesShort: semanaNomes,
    events: eventos,
    toolbarTemplate:
        '<div class="toolbar calendar-custom-toolbar">' +
            '<div class="toolbar-inner">' +
                '<div class="left">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                '</div>' +
                '<div class="center"></div>' +
                '<div class="right">' +
                    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                '</div>' +
            '</div>' +
        '</div>',
    onOpen: function (p) {
        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
        $$('.calendar-custom-toolbar .left .link').on('click', function () {
            calendarInline.prevMonth();
        });
        $$('.calendar-custom-toolbar .right .link').on('click', function () {
            calendarInline.nextMonth();
        });
    },
    onMonthYearChangeStart: function (p) {
        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    },
    onDayClick: function (p, dayContainer, year, month, day) {
      console.log('onDayClick');
    }
  });

  $$('#tab-1').on('tab:show', function () {
    console.log('tab:Calendário');
  });

  $$('#tab-2').on('tab:show', function () {
    myApp.showIndicator();
    var mySearchbar = myApp.searchbar('.searchbar', {
      searchList: '.list-block-search',
      searchIn: '.item-title'
    });
    getLojas();
  });

  $$('#tab-3').on('tab:show', function () {
    console.log('tab:Perfil');
  });
});
function getLojas() {
  $$.getJSON(apiUrl + 'stores.php', function (data) {
    console.log(data);
    $$('#lista-loja').empty();
    $$.each(data, function (index, store) {
      //console.log(randomBetween(1, 10));
      insertStore(store);
    });
  });

  $$(document).on('ajax:complete', function (e) {
    myApp.hideIndicator();
  });
}
function insertStore(store) {
  var layoutDaLista =
    '<li>' +
      '<a href="views/store.html" class="item-link item-content">' +
        '<div class="item-media"><img src="http://lorempixel.com/80/80/city/'+ randomBetween(1, 10) +'" width="80"></div>' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">'+ store.name +'</div>' +
            //'<div class="item-after">'+ store.hour +'</div>' +
          '</div>' +
          '<div class="item-subtitle">'+ store.mobile +'</div>' +
          '<div class="item-text">'+ store.address +', '+ store.number +'</div>' +
        '</div>' +
      '</a>' +
    '</li>';
  $$('#lista-loja').append(layoutDaLista);
}
function randomBetween(x, y) {
  //Generate random number between two numbers in JavaScript TODO
  return Math.floor(Math.random() * y) + x;
}