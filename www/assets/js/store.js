myApp.onPageInit('store', function (page) {
  myApp.showIndicator();
  setTimeout(function () {
      myApp.hideIndicator();
  }, 1000);

  var storeData = JSON.parse(storage.getItem('stores'));
  var id = page.query.id;

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
      $$('#itemmobile').text(store.mobile);
      $$('#itemName').text(store.name);
      $$('#itemNumber').text(store.number);
      $$('#itemPhone').text(store.phone);
      $$('#itemRito').text(store.rito);
      $$('#itemUf').text(store.uf);
      $$('#itemVeneravel').text(store.veneravel);

      if(store.number == ''){
        $$('#itemAddressNumber').text(store.address);
      }else{
        $$('#itemAddressNumber').text(store.address + ', ' + store.number);
      }
    }
  });

});
