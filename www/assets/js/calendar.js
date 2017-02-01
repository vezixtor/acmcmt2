var calendarInline;
var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro' , 'Outubro', 'Novembro', 'Dezembro'];
var semanaNomes = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function checkStore(){
	var userData = JSON.parse(storage.getItem('user'));
	var storeData = JSON.parse(storage.getItem('stores'));
	if(userData.store.length > 0){
		var indexStore = userData.store.split(',');
		var id = indexStore[0];
		$$.each(storeData, function (index, store) {
			if(id == store.id){
				$$('#titleStore').text(store.name);
			}
		});
	}else{
		$$('.confirm-ok').on('click', function () {
	    myApp.confirm('Are you sure?', function () {
	        myApp.alert('You clicked Ok button');
	    });
		});
	}
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
      $$('#lista-eventos').empty();
      if($$(dayContainer).hasClass('picker-calendar-day-has-events')) {
        var _month = parseInt(month) + 1;
        if(_month < 10) month = '0'+_month;
        printEvents(year, month, day);
      }
    }
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

function printEvents(year, month, day) {
  var lookingFor = year + '-' + month + '-' + day;
  var eventsData = JSON.parse(storage.getItem('events'));
	$$.each(eventsData, function (index, evento) {
		if(lookingFor == evento.date) {
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
    '<li>' +
      '<a href="views/event.html?type='+ store.type +'&id='+ store.id +'" class="item-link item-content border-'+ store.type +'">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">'+ store.title +'</div>' +
          '</div>' +
          '<div class="item-subtitle">'+ store.description + '</div>' +
        '</div>' +
      '</a>' +
    '</li>';
  $$('#lista-eventos').append(layoutDaLista);
}
function setEvents() {
  var eventsData = JSON.parse(storage.getItem('events'));
	var eventsDataP = JSON.parse(storage.getItem('eventsPersonal'));
	var eventsDataH = JSON.parse(storage.getItem('eventsHoliday'));
	var userEvent = JSON.parse(storage.getItem('user'));

	var id = userEvent.id;
	console.log(userEvent.id);
	console.log(id);
	var events = [], indexOld, indexLenght;
	if(eventsData.length > 0){
		$$.each(eventsData, function (index, evento) {
			events[index] = fixEventDate(evento.date);
			indexOld = index;
		});
	}
	++indexOld;
	if(eventsDataP.length > 0){
		$$.each(eventsDataP, function (index, evento) {
			if(id == evento.id_user){
				events[index + indexOld] = fixEventDate(evento.date);
				indexLenght = index + indexOld;
			}
		});
	}
	++indexLenght;
	if(eventsDataH.length > 0){
		$$.each(eventsDataH, function (index, evento) {
			events[index + indexLenght] = fixEventDate(evento.date);
		});
	}
	console.log(events);
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
		calendarView.router.loadPage('views/create-store-event.html');
		myApp.closeModal('.popover');
	});
});
