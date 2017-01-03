myApp.onPageInit('register', function (page) {
  console.log("Qualquer coisa");
  //Colocando mask em campos
  $('#CIM').mask('000000');

  var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      }
  };

  $('#phone').mask(SPMaskBehavior, spOptions);

  $$('#register').on('click', function() {
  	var storedData = myApp.formGetData('register-form');
  	if(storedData) {
  		console.log(JSON.stringify(storedData));
      register(JSON.stringify(storedData));
  	}
  	else {
  		console.log('Erro')
  	}
  });
});

function register(storedData){
  $$.post(apiUrl + 'register.php', storedData, function (data) {
    console.log(data);
    var objeto = JSON.parse(data);
    if(objeto.success == 1){
      myApp.alert(objeto.message, 'CADASTRO', function () {
        mainView.router.back();
      });
    }else{
      myApp.addNotification({
        title: 'ERRO',
        message: objeto.message
      });
    };
  },
    function (xhr, status){console.log(xhr, status)}
  );

  $$(document).on('ajax:complete', function (e) {
    myApp.hideIndicator();
  });

}