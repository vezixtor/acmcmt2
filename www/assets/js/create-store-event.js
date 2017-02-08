myApp.onPageAfterBack('createStoreEvent', function (page) {
  $$('.toolbar').show();
});

myApp.onPageInit('createStoreEvent', function (page) {
  $$('.toolbar').hide();
  $('#eventHour').mask('00:00');
  $("#eventHour").prop('value', '00:00');

  var id = page.query.id;

  var storeData = JSON.parse(storage.getItem('stores'));
  var userData = JSON.parse(storage.getItem('user'));

  var index = storeData.map(function(e) { return e.id; }).indexOf(id);
  var title = storeData[index].name;

  $$('#eventStore').text(title);

  $$('#newStoreEvent').on('click', function() {
    var formEvent = myApp.formToData('#createStoreEvent-form');
    if(formEvent){
      formEvent.type = 'store';
      formEvent.id_store = id;
      if(document.getElementById('checkHour').checked) {
        formEvent.full_time = 'true';
      } else {
        formEvent.full_time = 'false';
      }
      addNewStoreEvent(JSON.stringify(formEvent));
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

function addNewStoreEvent(formEvent){
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
      $.getJSON(apiUrl + "events.php?type=store", function (data) {
        storage.setItem('events', JSON.stringify(data));
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
        checkStore(id, title);
        calendarView.router.back();
      });
    }
  });
}
