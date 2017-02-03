myApp.onPageInit('event', function (page) {
  $$('.toolbar').hide();

});
myApp.onPageAfterBack('event', function (page) {
  $$('.toolbar').show();
});
myApp.onPageBeforeInit('event', function (page) {
  var id = page.query.id;
  var type = page.query.type;

  var userData = JSON.parse(storage.getItem('user'));
  var userEvent = JSON.parse(storage.getItem('eventsPersonal'));
  var storeEvent = JSON.parse(storage.getItem('events'));
  var holidayEvent = JSON.parse(storage.getItem('eventsHoliday'));

  if(type == 'store'){
    var eventType = storeEvent;
  }else if(type == 'personal'){
    var eventType = userEvent;
  }else {
    var eventType = holidayEvent;
  }

  $$.each(eventType, function (index, data){
    if(id == data.id){
      $$('#itemId').text(data.id);
      $$('#itemTitle').text(data.title);
      $$('#itemHour').text(data.hour);
      $$('#itemDate').text(adjustBirth(data.date));
      $$('#itemDescription').text(data.description);
      $$('#itemStore').text(data.store);
      $$('#itemIdStore').text(data.id_store);
      $$('#itemRito').text(data.rito);
      $$('#itemIdUser').text(data.id_user);
      $$('#itemType').text(data.type);

      function adjustBirth(data){
      	return data.substring(8,10) + '-' + data.substring(5,7) + '-' + data.substring(0,4);
      }

      $$('#itemFullDay').text('Dia: '+ adjustBirth(data.date));
      if(data.full_time == 'true'){
        $$('#itemFullHour').text('Horário: Dia inteiro');
      }else{
        $$('#itemFullHour').text('Horário: '+ data.hour);
      }
      if(data.type == 'store'){
        $$('#itemA').text('Loja: '+ data.store);
        $$('#itemB').text('Descrição:');
        $$('#divB').css({
          'text-align': 'center',
          'font-weight': 'bold'
        });
        $$('#itemC').text(data.description);
        $$('#divC').css('text-align', 'center');
      }else{
        $$('#itemA').text('Descrição:');
        $$('#divA').css({
          'text-align': 'center',
          'font-weight': 'bold'
        });
        $$('#itemB').text(data.description);
        $$('#divB').css('text-align', 'center');
        $$('#itemC').text('');
        $$('#divC').addClass('noDisplay');
      }

    }
  });

  $$('#deleteEvent').on('click', function () {
    myApp.confirm('Deseja deletar este evento', '', function () {
        deletEvent(id, type);
        myApp.alert('Evento deletado', 'Deletado');
    });
  });

});

function deletEvent(id, type){
  var dataDelete = {id: id, type: type};
  console.log(dataDelete);

  $$.post(apiUrl + 'events_delete.php', JSON.stringify(dataDelete), function (data) {
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
      $.getJSON(apiUrl + "events.php?type="+ type, function (data) {
        if(type == 'store'){
          storage.setItem('events', JSON.stringify(data));
        }else{
          storage.setItem('eventsPersonal', JSON.stringify(data));
        }
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
