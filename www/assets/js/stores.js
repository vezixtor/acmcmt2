var mySearchbar = myApp.searchbar('.searchbar', {
  searchList: '.list-block-search',
  searchIn: '.item-title',
removeDiacritics: true
});

getLojas();

function getLojas() {
  $$('#lista-loja').empty();
  var storeData = JSON.parse(storage.getItem('stores'));
  $$.each(storeData, function (index, store) {
    insertStore(store);
  });
}

function insertStore(store) {
  var layoutDaLista =
    '<li>' +
      '<a href="views/store.html?id='+ store.id +'" class="item-link item-content">' +
        //'<div class="item-media"><img src="http://lorempixel.com/80/80/city/'+ randomBetween(1, 10) +'" width="80"></div>' +
        '<div class="item-media"><img src="http://placehold.it/200.png/0000bb" width="80"></div>' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">'+ store.name +'</div>' +
            //'<div class="item-after">'+ store.hour +'</div>' +
          '</div>' +
          '<div class="item-subtitle">'+ store.address +', '+ store.number +'</div>' +
          '<div class="item-text">'+ store.city +', '+ store.uf +'</div>' +
        '</div>' +
      '</a>' +
    '</li>';
  $$('#lista-loja').append(layoutDaLista);
}
function randomBetween(x, y) {
  //Generate random number between two numbers in JavaScript TODO
  return Math.floor(Math.random() * y) + x;
}
