myApp.onPageInit('event', function (page) {
  $$('.toolbar').hide();

  $$('#deleteEvent').on('click', function () {
    myApp.confirm('Deseja deletar este evento', '', function () {
        myApp.alert('Evento deletado', 'Deletado');
        calendarView.back();
    });
  });

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

      console.log(data);
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

});
