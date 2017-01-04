//dashboard.html

var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro' , 'Outubro', 'Novembro', 'Dezembro'];
var semanaNomes = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
var eventos =  [
  new Date(2016, 11, 25),
  new Date(2017, 0, 1)
];
myApp.onPageInit('dashboard', function (page) {

  //CALENDARIO
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

  //LOJAS
  $$('#tab-2').on('tab:show', function () {
    var mySearchbar = myApp.searchbar('.searchbar', {
      searchList: '.list-block-search',
      searchIn: '.item-title',
	  removeDiacritics: true
    });
    getLojas();
  });

  //PERFIL
  $$('#tab-3').on('tab:show', function () {
    console.log('tab:Perfil');
  });
});

function getLojas() {
  var storeData = JSON.parse(storage.getItem('stores'));
  $$.each(storeData, function (index, store) {
    insertStore(store);
  });
}

function insertStore(store) { //TODO ONDE PAROU!!!
  var layoutDaLista =
    '<li>' +
      '<a href="views/store.html?id='+ store.id +'" class="item-link item-content">' +
        '<div class="item-media"><img src="http://lorempixel.com/80/80/city/'+ randomBetween(1, 10) +'" width="80"></div>' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">'+ store.name +'</div>' +
            //'<div class="item-after">'+ store.hour +'</div>' +
          '</div>' +
          '<div class="item-subtitle">'+ store.address +', '+ store.number +'</div>' +
          '<div class="item-text">'+ store.city +', '+ store.uf +'</div>' +
        '</div>' +
      '</a>' +
    '</li>';
  $$('#lista-loja').append(layoutDaLista);
}
function randomBetween(x, y) {
  //Generate random number between two numbers in JavaScript TODO
  return Math.floor(Math.random() * y) + x;
}
