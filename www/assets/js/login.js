function login(){

}



// In page callbacks:
myApp.onPageInit('login', function (page) {
  $$('#login').on('click', function() {
    console.log("login");
  });
})
