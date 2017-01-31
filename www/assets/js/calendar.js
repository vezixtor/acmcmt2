var calendarInline;
var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro' , 'Outubro', 'Novembro', 'Dezembro'];
var semanaNomes = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

createCalendar();

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
}

function printEvents(year, month, day) {
  var lookingFor = year + '-' + month + '-' + day;
  var eventsData = JSON.parse(storage.getItem('events'));
	$$.each(eventsData, function (index, evento) {
		if(lookingFor == evento.date) {
      addEvent(evento);
    }
	});
}
function addEvent(store) {
  var layoutDaLista =
    '<li>' +
      '<a href="views/event.html?type='+ store.type +'&id='+ store.id +'" class="item-link item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">'+ store.title +'</div>' +
          '</div>' +
          '<div class="item-subtitle">'+ store.type + '</div>' +
        '</div>' +
      '</a>' +
    '</li>';
  $$('#lista-eventos').append(layoutDaLista);
}
function setEvents() {
  var eventsData = JSON.parse(storage.getItem('events'));
	var events = [];
	$$.each(eventsData, function (index, evento) {
		events[index] = fixEventDate(evento.date);
	});
	return events;
}
function fixEventDate(date) {
	return new Date(date.substring(0, 4), parseInt(date.substring(5, 7)) - 1, date.substring(8, 10));
}

//TODO New events
var userData = JSON.parse(storage.getItem('user'));

if(userData.type == 'admin'){
	$$('#adminEvent').show();
}else if(splitAdmin(userData.admin_store, id)){
	$$('#adminEvent').show();
}

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
