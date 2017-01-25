myApp.onPageBeforeInit('store', function (page) {
  var id = page.query.id;
  console.log(id);

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
      $$('#itemWeek').text(store.week);

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

      if(store.day == 'Domingo' || store.day == 'Sábado'){
        var pri = 'o primeiro ';
        var seg = ' segundo ';
        var ter = ' terceiro ';
        var ult = 'o último ';
      }else{
        var pri = 'a primeira ';
        var seg = ' segunda ';
        var ter = ' terceira ';
        var ult = 'a última ';
      }

      if(store.day == '' || store.hour == ''){
        $$('#itemDate').text('');
        $$('#divDate').addClass('noDisplay');
      }else if(store.week == '0'){
        $$('#itemDate').text('Dia: ' + store.day + ' à partir das ' + store.hour);
      }else if(store.week == '1'){
        $$('#itemDate').text('Dia: N' + pri + store.day + ' do mês à partir das ' + store.hour);
      }else if(store.week == '2'){
        $$('#itemDate').text('Dia: Na' + seg + store.day + ' do mês à partir das ' + store.hour);
      }else if(store.week == '3'){
        $$('#itemDate').text('Dia: Na' + ter + store.day + ' do mês à partir das ' + store.hour);
      }else if(store.week == '4'){
        $$('#itemDate').text('Dia: N' + ult + store.day + ' do mês à partir das ' + store.hour);
      }else if(store.week == '1,2'){
        $$('#itemDate').text('Dia: N'+ pri + 'e' + seg + store.day + ' do mês à partir das ' + store.hour);
      }else if(store.week == '1,3'){
        $$('#itemDate').text('Dia: N'+ pri + 'e' + ter + store.day + ' do mês à partir das ' + store.hour);
      }else if(store.week == '2,3'){
        $$('#itemDate').text('Dia: Na'+ seg + 'e' + ter + store.day + ' do mês à partir das ' + store.hour);
      }else if(store.week == '-1'){
        $$('#itemDate').text('Dia: Exceto n' + pri + store.day + ' do mês à partir das ' + store.hour);
      }else if(store.week == '-4'){
        $$('#itemDate').text('Dia: Exceto n' + ult + store.day + ' do mês à partir das ' + store.hour);
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
