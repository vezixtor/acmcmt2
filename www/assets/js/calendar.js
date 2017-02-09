var calendarInline;
var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro' , 'Outubro', 'Novembro', 'Dezembro'];
var semanaNomes = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
var idStoreGlobal;


function checkStore(){
	var userData = JSON.parse(storage.getItem('user'));
	var storeData = JSON.parse(storage.getItem('stores'));
	if(userData.store.length > 0){
		var indexStore = userData.store.split(',');
		var id = indexStore[0];
		$$.each(storeData, function (index, store) {
			if(id == store.id){
				//$$('#titleStore').text(store.name);
				var title = store.name;
				createCalendar(id, title);
			}
		});
	}
}

function createCalendar(idStore, title) {
	idStoreGlobal = idStore;
	$$('#calendar-inline-container').empty();
	$('#titleStore').text(title);
	calendarInline = myApp.calendar({
    container: '#calendar-inline-container',
    value: [new Date()],
    weekHeader: true,
    dayNamesShort: semanaNomes,
    events: setEvents(idStore),
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
			$$('#lista-eventos').empty();
      $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
      $$('.calendar-custom-toolbar .left .link').on('click', function () {
          calendarInline.prevMonth();
      });
      $$('.calendar-custom-toolbar .right .link').on('click', function () {
          calendarInline.nextMonth();
      });

			//Pega o dia de hoje (Mesmo comando do parametro "value" deste calendar)
			var toDate = new Date();
			var year = toDate.getFullYear(),
					month = toDate.getMonth(),
					day = toDate.getDate();

			//Encontra o "dayContainer" de hoje
			var dayContainer = $$(p.container[0]).find('.picker-calendar-day-today');

			//Se o hoje houver evento, exiba-os...
			if($$(dayContainer).hasClass('picker-calendar-day-has-events')) {
        var _month = parseInt(month) + 1;
				var _day = parseInt(day);
        if(_month < 10) month = '0'+_month;
				if(_day < 10) day = '0'+_day;
        printEvents(year, month, day, idStore);
      }
    },
    onMonthYearChangeStart: function (p) {
        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    },
    onDayClick: function (p, dayContainer, year, month, day) {
      $$('#lista-eventos').empty();
      if($$(dayContainer).hasClass('picker-calendar-day-has-events')) {
        var _month = parseInt(month) + 1;
				var _day = parseInt(day);
        if(_month < 10) month = '0'+_month;
				if(_day < 10) day = '0'+_day;
        printEvents(year, month, day, idStore);
      }
    },
  });

	var userData = JSON.parse(storage.getItem('user'));

	if(userData.type == 'admin'){
		$$('#adminEvent').show();
	}else if(userData.admin_store == ''){
		$$('#adminEvent').hide();
	}else if(splitAdmin(userData.admin_store, id)){
		$$('#adminEvent').show();
	}
}

function printEvents(year, month, day, idStore) {
  var lookingFor = year + '-' + month + '-' + day;
  var eventsData = JSON.parse(storage.getItem('events'));
	$$.each(eventsData, function (index, evento) {
		if(lookingFor == evento.date && idStore == evento.id_store) {
      addEvent(evento);
    }
	});
	var eventsDataH = JSON.parse(storage.getItem('eventsHoliday'));
	$$.each(eventsDataH, function (index, evento) {
		if(lookingFor == evento.date) {
      addEvent(evento);
    }
	});
	var userEvent = JSON.parse(storage.getItem('user'));
	var eventsDataP = JSON.parse(storage.getItem('eventsPersonal'));
	var id = userEvent.id;
	$$.each(eventsDataP, function (index, evento) {
		if(id == evento.id_user && lookingFor == evento.date){
	    addEvent(evento);
		}
	});
}
function addEvent(store) {
  var layoutDaLista =
    '<li>';
			if(store.type == 'holiday'){
			layoutDaLista +=	'<a href="#" class="item-content border-'+ store.type +'">';
		}else{
			layoutDaLista += '<a href="views/event.html?type='+ store.type +'&id='+ store.id +'" class="item-link item-content border-'+ store.type +'">';
		}
    	layoutDaLista += '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">'+ store.title +'</div>' +
          '</div>' +
          '<div class="item-subtitle">'+ store.description + '</div>' +
        '</div>' +
      '</a>' +
    '</li>';
  $$('#lista-eventos').append(layoutDaLista);
}
function setEvents(idStore) {
  var eventsData = JSON.parse(storage.getItem('events'));
	var eventsDataP = JSON.parse(storage.getItem('eventsPersonal'));
	var eventsDataH = JSON.parse(storage.getItem('eventsHoliday'));
	var userEvent = JSON.parse(storage.getItem('user'));

	var id = userEvent.id;
	var events = [];
	var indexPersonal = 0, indexHoliday;
	var countPersonal = 0, countStore = 0;

	if(eventsData.length > 0){
		$$.each(eventsData, function (index, evento) {
			if(idStore == evento.id_store){
				events[countStore] = fixEventDate(evento.date);
				indexPersonal = ++countStore;
			}
		});
	}
	if(eventsDataP.length > 0){
		$$.each(eventsDataP, function (index, evento) {
			if(id == evento.id_user){
				events[indexPersonal + countPersonal++] = fixEventDate(evento.date);
				indexHoliday = countPersonal + indexPersonal;
			}
		});
	}
	if(eventsDataH.length > 0){
		$$.each(eventsDataH, function (index, evento) {
			events[index + indexHoliday] = fixEventDate(evento.date);
		});
	}
	return events;
}
function fixEventDate(date) {
	return new Date(date.substring(0, 4), parseInt(date.substring(5, 7)) - 1, date.substring(8, 10));
}

//TODO New events

function splitAdmin(adminEvent, id){
  var result = adminEvent.split(',');
  if(result.indexOf(id) > -1){
    return true;
  }else{
    return false;
  }
}

$$('#eventPopover').on('click', function () {
	var clickedLink = this;
	myApp.popover('.popover-event', clickedLink);

	$$('#newEvent').on('click', function() {
		calendarView.router.loadPage('views/create-event.html');
		myApp.closeModal('.popover');
	});
	$('#newEventStore').on('click', function() {
		calendarView.router.loadPage('views/create-store-event.html?id='+idStoreGlobal);
		myApp.closeModal('.popover');
	});
});
