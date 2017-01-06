//dashboard.html
var calendarInline;
var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro' , 'Outubro', 'Novembro', 'Dezembro'];
var semanaNomes = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
var eventos =  [
  new Date(2016, 11, 25),
  new Date(2017, 0, 1)
];
myApp.onPageInit('dashboard', function (page) {
  $$('#settings').hide();
  $$('#logout').hide();

  //CALENDARIO
  createCalendar();
  $$('#tab-1').on('tab:show', function () {
    $$('#settings').hide();
    $$('#logout').hide();
  });

  //LOJAS
  $$('#tab-2').on('tab:show', function () {
    $$('#settings').hide();
    $$('#logout').hide();
    var mySearchbar = myApp.searchbar('.searchbar', {
      searchList: '.list-block-search',
      searchIn: '.item-title',
	  removeDiacritics: true
    });
    getLojas();
  });

  //PERFIL
  setProfile();
  $$('#tab-3').on('tab:show', function () {
    $$('#settings').show();
    $$('#logout').show();
  });
  $$('#settings').on('click', function (){
    settings();
  });
  $$('#logout').on('click', function (){
    logout();
  });
});
function setProfile() {
	var storeData = JSON.parse(storage.getItem('user'));
  console.log(storeData);
  $$('#userName').text(storeData.name);
  $$('#userEmail').text(storeData.email);
  $$('#userCim').text(storeData.cim);
  $$('#userBirth').text(storeData.birth);
  $$('#userPhone').text(storeData.phone);
  $$('#userPosition').text(storeData.position);
  $$('#userProfession').text(storeData.profession);
  $$('#userStore').text(storeData.store);
  $$('#userType').text(storeData.type);

  $$('#userEmailFull').text('Email: ' + storeData.email);
  $$('#userCimFull').text('CIM: ' + storeData.cim);
  $$('#userBirthFull').text('Data de Nascimento: ' + storeData.birth);
  $$('#userPhoneFull').text('Celular: ' + storeData.phone);
}

function getLojas() {
  var storeData = JSON.parse(storage.getItem('stores'));
  $$.each(storeData, function (index, store) {
    insertStore(store);
  });
}

function insertStore(store) {
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

function logout(){
  console.log("logout");
}
function settings(){
  console.log("settings");
}


function createCalendar() {
	calendarInline = myApp.calendar({
    container: '#calendar-inline-container',
    value: [new Date()],
    weekHeader: true,
    dayNamesShort: semanaNomes,
    events: setEvents(),
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
      console.log($$(this).hasClass('calendar-day-has-events'));
      console.log(year, month, day);
    }
  });
}

function setEvents() {
  var storeData = JSON.parse(storage.getItem('events'));
	var events = [];
	$$.each(storeData, function (index, evento) {
		events[index] = fixEventDate(evento.date);
	});
	return events;
}
function fixEventDate(date) {
	return new Date(date.substring(0, 4), parseInt(date.substring(5, 7)) - 1, date.substring(8, 10));
}
