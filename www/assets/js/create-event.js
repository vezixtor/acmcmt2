myApp.onPageAfterBack('createEvent', function (page) {
  $$('.toolbar').show();
});
myApp.onPageInit('createEvent', function (page) {
  $$('.toolbar').hide();

  $('#createHour').mask('00:00');

  $$('#newEvent').on('click', function() {
    var formEvent = myApp.formToData('#createEvent-form');
    if(formEvent){
      addEvent(JSON.stringify(formEvent));
    }else{
      console.log(JSON.stringify(formEvent));
    }
  });
});

function addStore(formStore){
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

      calendarView .router.back();
    }
  });
}
