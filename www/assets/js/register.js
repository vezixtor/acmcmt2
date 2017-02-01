myApp.onPageBeforeInit('register', function (page) {
  storesSelect();
});

myApp.onPageInit('register', function (page) {
  $$('.navbar').show();
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
  	var storedData = myApp.formToData('#register-form');
  	if(storedData) {
      storedData.store = storedData.store.join(',');
  		console.log(JSON.stringify(storedData));
      register(JSON.stringify(storedData));
  	}
  	else {
  		console.log(JSON.stringify(storedData))
  	}
  });
});

function storesSelect(){
  var storeData = JSON.parse(storage.getItem('stores'));
  $$.each(storeData, function (index, store) {
    createSelect(store);
  });
}
function createSelect(store) {
  var layoutDaLista =
    '<option value="'+ store.id +'">'+ store.name +'</option> ';
  $$('#selectStore').append(layoutDaLista);
}

function register(storedData){
  $$.post(apiUrl + 'register.php', storedData, function (data) {
    console.log(data);
    var objeto = JSON.parse(data);
    if(objeto.success == 1){
      iziToast.success({
    		title: 'Cadastro',
    		message: objeto.message,
        backgroundColor: '#EFEFEF',
        titleColor: 'red',
        timeout: 2000,
        animateInside: true,
        position: 'center'
			});
      splashView.router.back();
    }else{
      iziToast.error({
    		title: 'ERRO',
    		message: objeto.message,
        backgroundColor: '#EFEFEF',
        titleColor: 'red',
        timeout: 2000,
        animateInside: true,
        position: 'center'
			});
    };
  },
    function (xhr, status){console.log(xhr, status)}
  );

  $$(document).on('ajax:complete', function (e) {
    myApp.hideIndicator();
  });

}
