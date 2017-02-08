myApp.onPageAfterBack('createEvent', function (page) {
  $$('.toolbar').show();
});

myApp.onPageInit('createEvent', function (page) {
  $$('.toolbar').hide();
  $('#eventHour').mask('00:00');
  $("#eventHour").prop('value', '00:00');

  var userData = JSON.parse(storage.getItem('user'));

  $$('#newEvent').on('click', function() {
    var formEvent = myApp.formToData('#createEvent-form');
    if(formEvent){
      formEvent.type = 'personal';
      formEvent.id_user = userData.id;
      if(document.getElementById('checkHour').checked) {
        formEvent.full_time = 'true';
      } else {
        formEvent.full_time = 'false';
      }
      addNewEvent(JSON.stringify(formEvent));
    }else{
      console.log(JSON.stringify(formEvent));
    }
  });

  $('#checkHour').click(function() {
    if(document.getElementById('checkHour').checked) {
      $("#eventHour").prop('disabled', true);
      $("#eventHour").prop('value', '00:00');
    } else {
      $("#eventHour").prop('disabled', false);
    }
  });
});

function addNewEvent(formEvent){
  $$.post(apiUrl + 'events_create.php', formEvent, function (data) {
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
      $.getJSON(apiUrl + "events.php?type=personal", function (data) {
        storage.setItem('eventsPersonal', JSON.stringify(data));
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
  });
}
