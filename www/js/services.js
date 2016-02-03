angular.module('starter.services', [])

  .factory('Menu', function ($http, $rootScope, $stateParams, $q) {
    var deferred = $q.defer();

    var today = new Date();
    var nextWeekToday = new Date();
    nextWeekToday.setDate(nextWeekToday.getDate() + 5);

    var currentDate = today;
    var menu = [];
    var checkedDates = 0;
    while (currentDate <= nextWeekToday)  {

      var weekDay = currentDate.getDay();
      if(weekDay !== 0 && weekDay !== 6) {
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth()+1;
        if (month < 10) {
          month = '0'+month;
        }
        var date = currentDate.getDate();
        if (date < 10) {
          date = '0'+date;
        }
        $http.get(
          'http://www.sodexo.fi/ruokalistat/output/daily_json/54/'+year+'/'+month+'/'+date+'/fi'
        ).then(function(response) {
          var dateFromUrl = response.config.url;
          dateFromUrl = dateFromUrl.replace('http://www.sodexo.fi/ruokalistat/output/daily_json/54/', '').replace('/fi', '');
          checkedDates++;
          var courses = response.data.courses;
          if (courses.length > 0) {
            var day = {
              date: dateFromUrl,
              courses: courses
            };
            menu.push(day);
            console.log("a");
          }
          if (checkedDates === 4) {
            deferred.resolve(menu);
          }
        });
      }
      currentDate.setDate(currentDate.getDate()+1);
    }

    return deferred.promise;
  });

/*.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});*/
