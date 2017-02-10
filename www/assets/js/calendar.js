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

	var printWeekDay = addStoreEvent(idStore);
	var stringAdjust = printWeekDay.toString();
	stringAdjust = stringAdjust.replace(",,,,,", ",");
	stringAdjust = stringAdjust.replace(",,,,", ",");
	stringAdjust = stringAdjust.replace(",,,", ",");
	stringAdjust = stringAdjust.replace(",,", ",");
	printWeekDay = stringAdjust.split(',');
	var printWeekDayLength = printWeekDay.length;
	for(var x = 0; x < printWeekDayLength; x++){
		var newDate = new Date(printWeekDay[x]);
		var m = newDate.getUTCMonth() + 1; //months from 1-12
		var d = newDate.getUTCDate();
		var y = newDate.getUTCFullYear();
		var _m = parseInt(m);
		var _d = parseInt(d);
		if(_m < 10) m = '0'+_m;
		if(_d < 10) d = '0'+_d;
		newdate = y + "-" + m + "-" + d;
		if(lookingFor == newdate){
				var storesData = JSON.parse(storage.getItem('stores'));
				var index = storesData.map(function(e) { return e.id; }).indexOf(idStore);
				var rito = storesData[index].rito;
				var date = storesData[index].date;
			  var hour = storesData[index].hour;

	    addEvent(storesData[index]);
		}
	}

}
function addEvent(store) {
  if(store.type){
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
	}else{
		var layoutDaLista =
		  '<li>' +
		    '<a href="#" class="item-link item-content border-store">' +
		      '<div class="item-inner">' +
		        '<div class="item-title-row">' +
		          '<div class="item-title">RITO: '+ store.rito +'</div>' +
		        '</div>' +
		        '<div class="item-subtitle">'+ store.hour + '</div>' +
		      '</div>' +
		    '</a>' +
		  '</li>';
		$$('#lista-eventos').append(layoutDaLista);
	}
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

	var eventsWeekDay = addStoreEvent(idStore);
	events = events.concat(eventsWeekDay);

	var stringAdjust = events.toString();
	stringAdjust = stringAdjust.replace(",,,,,", ",");
	stringAdjust = stringAdjust.replace(",,,,", ",");
	stringAdjust = stringAdjust.replace(",,,", ",");
	stringAdjust = stringAdjust.replace(",,", ",");
	events = stringAdjust.split(',');

	return events;

}
function fixEventDate(date) {
	return new Date(date.substring(0, 4), parseInt(date.substring(5, 7)) - 1, date.substring(8, 10));
}

function addStoreEvent(idStore){
	var storeData = JSON.parse(storage.getItem('stores'));
	var index = storeData.map(function(e) { return e.id; }).indexOf(idStore);
	var storeDay = storeData[index].day;
	var storeWeek = storeData[index].week;
	var storeHour = storeData[index].hour;

	var domingo = [], segunda = [], terca = [], quarta = [], quinta = [], sexta = [], sabado = [];

	for(var x = 0; x < 7; x++){
	  var date = new Date();
	  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	  Date.prototype.getNextWeek = function() {
	    var d = new Date(firstDay);
	    var diff = d.getDate() - d.getDay() + x;
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
	  date = date.getNextWeek();
	  var lastDay = new Date(dateLast.getFullYear(), dateLast.getMonth() + 1, 0);
	  var i = 0;

	  var weekDay = [];
	  while(check){
	    if(date.addDays(7*i) <= lastDay){
	      if(date.addDays(7*i) >= firstDay){
					var m = date.addDays(7*i).getUTCMonth() + 1; //months from 1-12
					var d = date.addDays(7*i).getUTCDate();
					var y = date.addDays(7*i).getUTCFullYear();

					newdate = y + "-" + m + "-" + d;
	        weekDay[i] = newdate;
	      }
	    }else{
	      check = false;
	    }
	    i++;
	  }
	  if(x == 0){
	    domingo = weekDay;
	  }else if(x == 1){
	    segunda = weekDay;
	  }else if(x == 2){
	    terca = weekDay;
	  }else if(x == 3){
	    quarta = weekDay;
	  }else if(x == 4){
	    quinta = weekDay;
	  }else if(x == 5){
	    sexta = weekDay;
	  }else if(x == 6){
	    sabado = weekDay;
	  }

	}

	var selectedWeek = [];
	if(storeDay == 'Segunda-Feira'){
		selectedWeek = segunda;
	}else if(storeDay == 'Terça-Feira'){
		selectedWeek = terca;
	}else if(storeDay == 'Quarta-Feira'){
		selectedWeek = quarta;
	}else if(storeDay == 'Quinta-Feira'){
		selectedWeek = quinta;
	}else if(storeDay == 'Sexta-Feira'){
		selectedWeek = sexta;
	}else if(storeDay == 'Sábado'){
		selectedWeek = sabado;
	}else if(storeDay == 'Domingo'){
		selectedWeek = domingo;
	}

	if(storeWeek == '0'){
		selectedWeek;
	}else if(storeWeek == '1'){
		selectedWeek = selectedWeek[0];
	}else if(storeWeek == '2'){
		selectedWeek = selectedWeek[1];
	}else if(storeWeek == '3'){
		selectedWeek = selectedWeek[2];
	}else if(storeWeek == '4'){
		selectedWeek = selectedWeek.slice(-1)[0];
	}else if(storeWeek == '1,2'){
		var w1 = selectedWeek.slice(0)[0]
		var w2 = selectedWeek.slice(1)[0]
		selectedWeek = [];
		selectedWeek[0] = w1;
		selectedWeek[1] = w2;
	}else if(storeWeek == '1,3'){
		var w1 = selectedWeek.slice(0)[0]
		var w2 = selectedWeek.slice(2)[0]
		selectedWeek = [];
		selectedWeek[0] = w1;
		selectedWeek[1] = w2;
	}else if(storeWeek == '2,3'){
		var w1 = selectedWeek.slice(1)[0]
		var w2 = selectedWeek.slice(2)[0]
		selectedWeek = [];
		selectedWeek[0] = w1;
		selectedWeek[1] = w2;
	}else if(storeWeek == '-1'){
		selectedWeek.splice(0,1);
	}else if(storeWeek == '-4'){
		selectedWeek.splice(-1,1);
	}

	eventsWeekDay = selectedWeek;
	return eventsWeekDay;
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
