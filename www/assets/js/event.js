myApp.onPageInit('event', function (page) {
  $$('.toolbar').hide();
});
myApp.onPageAfterBack('event', function (page) {
  $$('.toolbar').show();
});
myApp.onPageBeforeInit('event', function (page) {


  var userData = JSON.parse(storage.getItem('user'));
});
