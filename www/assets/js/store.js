myApp.onPageBeforeAnimation('store', function (page) {
  var id = page.query.id;

  $$('#calendarLink').on('click', function() {
    storesView.router.back();
    myApp.showTab('#tab1');
  });

  $$('#editStore').on('click', function() {
    storesView.router.loadPage('views/edit-store.html?id=' + id);
  });

  var storeData = JSON.parse(storage.getItem('stores'));
  var userData = JSON.parse(storage.getItem('user'));

  if(userData.type == 'admin'){
    $$('#editStore').show();
  }else if(splitAdmin(userData.admin_store, id)){
    $$('#editStore').show();
  }

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

function splitAdmin(adminStore, id){
  var result = adminStore.split(',');
  if(result.indexOf(id) > -1){
    return true;
  }else{
    return false;
  }
}
