//Executa os códigos na iniciação da página
myApp.onPageInit('event', function (page) {
  $$('.toolbar').hide();

});

//Executa os códigos após voltar pra página
myApp.onPageAfterBack('event', function (page) {
  $$('.toolbar').show();
});

//Executa os códigos antes de iniciar a página
myApp.onPageBeforeInit('event', function (page) {
  var id = page.query.id;
  var type = page.query.type;
  var idStore;
  var id_user;

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


      if(type == 'store'){
        id_user = '';
        idStore = data.id_store;
        var storesData = JSON.parse(storage.getItem('stores'));
        var index = storesData.map(function(e) { return e.id; }).indexOf(idStore);
        var storeName = storesData[index].name;
      }else{
        id_user = data.id_user;
        idStore = '';
      }

      function adjustBirth(data){
      	return data.substring(8,10) + '-' + data.substring(5,7) + '-' + data.substring(0,4);
      }
      function adjustHour(hour){
      	return hour.substring(0,2) + ':' + hour.substring(3,5);
      }

      $$('#itemFullDay').text('Dia: '+ adjustBirth(data.date));
      if(data.full_time == 'true'){
        $$('#itemFullHour').text('Horário: Dia inteiro');
      }else{
        $$('#itemFullHour').text('Horário: '+ adjustHour(data.hour));
      }
      if(data.type == 'store'){
        $$('#itemA').text('Loja: '+ storeName);
        $$('#itemB').text('Descrição:');
        $$('#divB').css({
          'text-align': 'center',
          'font-weight': 'bold'
        });
        $$('#itemC').text(data.description);
        $$('#divC').css('text-align', 'center');
      }else if(data.type == 'personal'){
        $$('#itemA').text('Descrição:');
        $$('#divA').css({
          'text-align': 'center',
          'font-weight': 'bold'
        });
        $$('#itemB').text(data.description);
        $$('#divB').css('text-align', 'center');
        $$('#itemC').text('');
        $$('#divC').addClass('noDisplay');
      }else{
        $$('#divA').addClass('noDisplay');
        $$('#divB').addClass('noDisplay');
        $$('#divC').addClass('noDisplay');
      }

    }
  });

  $$('#deleteEvent').on('click', function () {
    myApp.confirm('Deseja deletar este evento', '', function () {
        deletEvent(id, type);
    });
  });

  $$('#editEvent').on('click', function () {
    calendarView.router.loadPage('views/edit-event.html?id=' + id + '&type=' + type + '&id_user=' + id_user + '&idStore=' + idStore);
    console.log(id, type, id_user, idStore);
  });

  if(type == 'holiday'){
    $$('#deleteEvent').hide();
    $$('#editEvent').hide();
  }

});

function deletEvent(id, type){
  var dataDelete = {id: id, type: type};

  $$.post(apiUrl + 'events_delete.php', JSON.stringify(dataDelete), function (data) {
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
        if(type == 'personal'){
          storage.setItem('eventsPersonal', JSON.stringify(data));
        }else{
          storage.setItem('events', JSON.stringify(data));
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
