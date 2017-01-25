myApp.onPageInit('createEvent', function (page) {
  $$('.toolbar').hide();
});
myApp.onPageAfterBack('createEvent', function (page) {
  $$('.toolbar').show();
});
