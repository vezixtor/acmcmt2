myApp.onPageInit('editEvent', function (page) {
  var id = page.query.id;
  var type = page.query.type;
  var idUser = page.query.id_user;
  var idStore = page.query.idStore;

  if(type == 'store'){
    var eventsData = JSON.parse(storage.getItem('events'));
  }else if(type == 'personal'){
    var eventsData = JSON.parse(storage.getItem('eventsPersonal'));
  }

  var index = eventsData.map(function(e) { return e.id; }).indexOf(id);
  var title = eventsData[index].title;
  var date = eventsData[index].date;
  var hour = eventsData[index].hour;
  var full_time = eventsData[index].full_time;
  var description = eventsData[index].description;

  $$('#eventTitle').val(title);
  $$('#eventDate').val(date);
  if(date.substring(0,4) > 1000){
    $$('#eventDate').val(date);
  }else{
    $$('#eventDate').val(adjustDate(date));
  }
  $$('#eventHour').val(hour);
  $$('#eventDesc').val(description);
  if(full_time == 'true'){
    $("#checkHour").prop('checked', true);
  }else{
    $("#checkHour").prop('checked', false);
  }

  $$('#updateEvent').on('click', function() {
    var formEvent = myApp.formToData('#editEvent-form');
    if(formEvent) {
      if(document.getElementById('checkHour').checked) {
        formEvent.full_time = 'true';
      } else {
        formEvent.full_time = 'false';
      }

      formEvent.type = type;
      formEvent.id = id;
      formEvent.id_user = idUser;
      formEvent.id_store = idStore;
      updateEvent(JSON.stringify(formEvent));
    }
    else {
      console.log(JSON.stringify(formEvent))
    }
  });


});

function adjustDate(data){
	return data.substring(6,10) + '-' + data.substring(3,5) + '-' + data.substring(0,2);
}

function updateEvent(formEvent, type){
  $$.post(apiUrl + 'events_update.php', formEvent, function (data) {
    
    console.log(data);
    var objeto = JSON.parse(data);
    if(objeto.success == 0){
      iziToast.warning({
    		title: 'ERRO',
    		message: objeto.message,
        backgroundColor: '#EFEFEF',
        titleColor: '#F1C40F',
        timeout: 2500,
        animateInside: true,
        position: 'center'
			});
    }else{
      console.log(type);
      if(type == 'store'){
        var t = 'store';
        var e = 'events';
      }else{
        var t = 'personal';
        var e = 'eventsPersonal';
      }
      $.getJSON(apiUrl + "events.php?type="+ t, function (data) {
        console.log(t)
        storage.setItem(e, JSON.stringify(data));
      }).done(function() {
        iziToast.success({
          message: objeto.message,
          backgroundColor: '#EFEFEF',
          titleColor: 'blue',
          timeout: 2500,
          animateInside: true,
          position: 'center'
        });
      }).always(function() {
        checkStore();
        calendarView.router.back();
      });
    }
    console.log(apiUrl + "events.php?type="+t);
  });
}
