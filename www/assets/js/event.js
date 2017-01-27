myApp.onPageInit('event', function (page) {
  $$('.toolbar').hide();
});
myApp.onPageAfterBack('event', function (page) {
  $$('.toolbar').show();
});
myApp.onPageBeforeInit('event', function (page) {
  var id = page.query.id;
  var type = page.query.type;

  console.log(id);
  console.log(type);

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
      $$('#itemHour').text(data.Hour);
      $$('#itemDate').text(data.date);
      $$('#itemDescription').text(data.description);
      $$('#itemStore').text(data.store);
      $$('#itemIdStore').text(data.id_store);
      $$('#itemRito').text(data.rito);
      $$('#itemIdUser').text(data.id_user);
    }
  });

});
