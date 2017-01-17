myApp.onPageInit('store', function (page) {
  var id = page.query.id;

  $$('#calendarLink').on('click', function() {
    myApp.showTab('#tab1');
  });

  $$('#editStore').on('click', function() {
    storesView.router.loadPage('views/edit-store.html?id=' + id);
  });

  var storeData = JSON.parse(storage.getItem('stores'));

  $$.each(storeData, function (index, store) {
    if(id == store.id){
      $$('#itemAddress').text(store.address);
      $$('#itemCep').text(store.cep);
      $$('#itemCity').text(store.city);
      $$('#itemCml').text(store.cml);
      $$('#itemDay').text(store.day);
      $$('#itemEmail').text(store.email);
      $$('#itemFundation').text(store.fundation);
      $$('#itemHour').text(store.hour);
      $$('#itemId').text(store.id);
      $$('#itemMobile').text(store.mobile);
      $$('#itemName').text(store.name);
      $$('#itemNumber').text(store.number);
      $$('#itemPhone').text(store.phone);
      $$('#itemRito').text(store.rito);
      $$('#itemUf').text(store.uf);
      $$('#itemVeneravel').text(store.veneravel);

      if(store.address == ''){
        $$('#itemAddressNumber').text('');
        $$('#divAddressNumber').addClass('noDisplay');
      }else{
        if(store.number == ''){
          $$('#itemAddressNumber').text(store.address);
        }else{
          $$('#itemAddressNumber').text(store.address + ', ' + store.number);
        }
      }

      if(store.cep == '' && store.city == ''){
        $$('#div2A').text('');
        $$('#div2B').text('');
        $$('#divCEP').addClass('noDisplay');
      }else if(store.cep == '' && !store.city == ''){
        $$('#div2A').text(store.city + ' - ' + store.uf);
        $$('#div2B').text('');
      }else{
        $$('#div2A').text('CEP: ' + store.cep);
        $$('#div2B').text(store.city + ' - ' + store.uf);
      }

      if(store.veneravel == ''){
        $$('#itemVeneravelFull').text('');
        $$('#divVenravel').addClass('noDisplay');
      }else{
        $$('#itemVeneravelFull').text('Venerável: ' + store.veneravel);
      }

      if(store.email == ''){
        $$('#itemEmailFull').text('');
        $$('#divEmail').addClass('noDisplay');
      }else{
        $$('#itemEmailFull').text('Email: ' + store.email);
      }

      if(store.phone == '' && store.cml == ''){
        $$('#div5A').text('');
        $$('#div5B').text('');
        $$('#divPhones').addClass('noDisplay');
      }else if(!store.phone == '' && store.cml == ''){
        $$('#div5A').text('Telefone: ' + store.phone);
        $$('#div5B').text('');
      }else if(store.phone == '' && !store.cml == ''){
        $$('#div5A').text('CML: ' + store.cml);
        $$('#div5B').text('');
      }else{
        $$('#div5A').text('Telefone: ' + store.phone);
        $$('#div5B').text('CML: ' + store.cml);
      }

      if(store.mobile == ''){
        $$('#itemMobileFull').text('');
        $$('#divMobile').addClass('noDisplay');
      }else{
        $$('#itemMobileFull').text('Celular: ' + store.mobile);
      }

      if(store.rito == ''){
        $$('#itemRitoFull').text('');
        $$('#divRITO').addClass('noDisplay');
      }else{
        $$('#itemRitoFull').text('RITO: ' + store.rito);
      }

      if(store.day == '' || store.hour == ''){
        $$('#itemDate').text('');
        $$('#divDate').addClass('noDisplay');
      }else{
        $$('#itemDate').text('Dia: ' + store.day + ' à partir das ' + store.hour);
      }

    }
  });

});

myApp.onPageInit('editStore', function (page) {
  var storeData = JSON.parse(storage.getItem('stores'));
  var id = page.query.id;
  $('#editMobile').mask('+00 00 00000-0000');
  $('#editPhone').mask('0000-0000');
  $('#editCml').mask('0000-0000');

  $$.each(storeData, function (index, store) {
    if(id == store.id){
      $$('#editAddress').val(store.address);
      $$('#editCep').val(store.cep);
      $$('#editCity').val(store.city);
      $('#editCml').val(store.cml).mask('0000-0000');
      $$('#editDay').val(store.day);
      $$('#editEmail').val(store.email);
      $$('#editFundation').val(dateAdjust(store.fundation));
      $$('#editHour').val(store.hour);
      $$('#editId').val(store.id);
      $('#editMobile').val(store.mobile).mask('+00 00 00000-0000');
      $$('#editName').val(store.name);
      $$('#editNumber').val(store.number);
      $('#editPhone').val(store.phone).mask('0000-0000');
      $$('#editRito').val(store.rito);
      $$('#editUf').val(store.uf);
      $$('#editVeneravel').val(store.veneravel);

      console.log(store.uf);
    }
  });
});

function dateAdjust(data){
	return data.substring(6,10) + '-' + data.substring(3,5) + '-' + data.substring(0,2);
}
