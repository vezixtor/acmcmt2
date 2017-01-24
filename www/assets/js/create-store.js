myApp.onPageInit('createStore', function (page) {
  $('#createMobile').mask('+00 00 00000-0000');
  $('#createPhone').mask('00 0000-0000');
  $('#createCml').mask('00 0000-0000');
  $('#createCep').mask('00000-000');
  $('#createHour').mask('00:00');
  $('#createId').mask('000');
  $('#createNumber').mask('00000');

  $$('#newStore').on('click', function() {
    var formStore = myApp.formToData('#createStore-form');
    if(formStore){
      addStore(JSON.stringify(formStore));
    }else{
      console.log(JSON.stringify(formStore));
    }
  });

});

function addStore(formStore){
  $$.post(apiUrl + 'stores_create.php', formStore, function (data) {
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
      $$.getJSON(apiUrl + 'stores.php', function (data) {
				storage.setItem('stores', JSON.stringify(data));
				getLojas();
			});
      profileView.router.back();
    }
  });
}
