// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

//API
var apiUrl = 'http://www.kashew.tecnologia.ws/agendamacom/';


//dashboard.html
var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto' , 'Setembro' , 'Outubro', 'Novembro', 'Dezembro'];
var semanaNomes = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
var eventos =  [
  new Date(2016, 11, 25),
  new Date(2017, 0, 1)
];
myApp.onPageInit('dashboard', function (page) {
  var calendarInline = myApp.calendar({
        container: '#calendar-inline-container',
        value: [new Date()],
        weekHeader: true,
        dayNamesShort: semanaNomes,
        events: eventos,
        toolbarTemplate:
            '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        onOpen: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendarInline.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
        },
        onDayClick: function (p, dayContainer, year, month, day) {
          console.log('onDayClick');
        }
    });

  $$('#tab-1').on('tab:show', function () {

  });

  $$('#tab-2').on('tab:show', function () {
    console.log('Tab 2 is visible');
    getLojas();
  });

});
function getLojas() {
  $$.getJSON(apiUrl + 'stores.php', function (data) {
    console.log(data);
  });
}
