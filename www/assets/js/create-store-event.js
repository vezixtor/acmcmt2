myApp.onPageAfterBack('createStoreEvent', function (page) {
  $$('.toolbar').show();
});
myApp.onPageInit('createStoreEvent', function (page) {
  $$('.toolbar').hide();

  $('#eventHour').mask('00:00');

  var storeData = JSON.parse(storage.getItem('stores'));

  $$('#newStoreEvent').on('click', function() {
    var formEvent = myApp.formToData('#createEvent-form');
    if(formEvent){
      formEvenet.type = 'store';
      formEvent.id_user = storeData.id;
      var check = formEvent.checked;
      if(check.length > 0){
        formEvent.full_time = 'true';
      }else {
        formEvent.full_time = 'false';
      }
      addNewStoreEvent(JSON.stringify(formEvent));
    }else{
      console.log(JSON.stringify(formEvent));
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
      iziToast.success({
    		message: objeto.message,
        backgroundColor: '#EFEFEF',
        titleColor: 'blue',
        timeout: 2500,
        animateInside: true,
        position: 'center'
			});

      calendarView.router.back();
    }
  });
}
