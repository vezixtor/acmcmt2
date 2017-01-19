myApp.onPageInit('editStore', function (page) {
  var storeData = JSON.parse(storage.getItem('stores'));
  var id = page.query.id;
  $('#editMobile').mask('+00 00 00000-0000');
  $('#editPhone').mask('0000-0000');
  $('#editCml').mask('0000-0000');
  $('#editCep').mask('00000-000');
  $('#editHour').mask('00:00');

  $$.each(storeData, function (index, store) {
    if(id == store.id){
      $$('#editAddress').val(store.address);
      $('#editCep').val(store.cep).mask('00000-000');
      $$('#editCity').val(store.city);
      $('#editCml').val(store.cml).mask('0000-0000');
      $$('#editDay').val(store.day);
      $$('#editWeek').val(store.week);
      $$('#editEmail').val(store.email);
      $$('#editFundation').val(dateAdjust(store.fundation));
      $('#editHour').val(store.hour).mask('00:00');;
      $$('#editId').val(store.id);
      $('#editMobile').val(store.mobile).mask('+00 00 00000-0000');
      $$('#editName').val(store.name);
      $$('#editNumber').val(store.number);
      $('#editPhone').val(store.phone).mask('0000-0000');
      $$('#editRito').val(store.rito);
      $$('#editUf').val(store.uf);
      $$('#editVeneravel').val(store.veneravel);

      console.log(store.id);
    }
  });

  $$('#updateStore').on('click', function() {
    var storedData = myApp.formToData('#editStore-form');
    if(storedData) {
      storedData.id = id;
      updateStore(JSON.stringify(storedData));
    }
    else {
      console.log(JSON.stringify(storedData))
    }
  });
});

function dateAdjust(data){
	return data.substring(6,10) + '-' + data.substring(3,5) + '-' + data.substring(0,2);
}

function updateStore(storedData){
  $$.post(apiUrl + 'stores_update.php', storedData, function (data) {
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
    }
    $$.getJSON(apiUrl + 'stores.php', function (data) {
      storage.setItem('stores', JSON.stringify(data))
      getLojas();
      storesView.router.back();
    });
  });
}
