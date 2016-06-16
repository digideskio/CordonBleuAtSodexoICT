angular.module('starter.services', [])

  .factory('Menu', function ($http, $rootScope, $stateParams, $q) {
    var deferred = $q.defer();

    var today = new Date();

    var nextWeekToday = new Date();
    if (today.getDay() === 6 || today.getDay() === 0) {
      nextWeekToday.setDate(nextWeekToday.getDate() + 5);
    } else {
      nextWeekToday.setDate(nextWeekToday.getDate() + 7);
    }

    var dates = {
      'sunday': 0,
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6
    };

    var getDate = function(date, numberOfDay) {
      var day = date.getDay() || 7;
      if( day !== numberOfDay ) {
        date.setHours(-24 * (day - numberOfDay));
      }
      return date;
    };


    var formatMenus = function(thisWeek, nextWeek){
      var i = 0;
      var courses = [];
      for (var k in thisWeek) {
        // skip loop if the property is from prototype
        if(thisWeek.hasOwnProperty(k)) {
          if (dates[k] >= today.getDay()) {
            var dailyMenu = {};
            dailyMenu.date = getDate(today, dates[k]).toString();
            dailyMenu.courses = thisWeek[k];
            courses.push(dailyMenu);
          }
        }
      }
      if(Object.keys(nextWeek).length > 0) {
        for (var k in nextWeek) {
          // skip loop if the property is from prototype
          if(thisWeek.hasOwnProperty(k)) {
            var dailyMenu = {};
            dailyMenu.date = getDate(nextWeekToday, dates[k]).toString();
            dailyMenu.courses = thisWeek[k];
            courses.push(dailyMenu);
          }
        }
      }
      return courses;
    };

    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth()+1;
    if (todayMonth < 10) {
      todayMonth = '0'+todayMonth;
    }
    var todayDate = today.getDate();
    if (todayDate < 10) {
      todayDate = '0'+todayDate;
    }

    var nextWeekYear = nextWeekToday.getFullYear();
    var nextWeekMonth = nextWeekToday.getMonth()+1;
    if (nextWeekMonth < 10) {
      nextWeekMonth = '0'+nextWeekMonth;
    }
    var nextWeekDate = nextWeekToday.getDate();
    if (nextWeekDate < 10) {
      nextWeekDate = '0'+nextWeekDate;
    }

    $http.get(
      'http://www.sodexo.fi/ruokalistat/output/weekly_json/54/'+todayYear+'/'+todayMonth+'/'+todayDate+'/fi'
    ).then(function(thisWeekMenu){
      $http.get(
        'http://www.sodexo.fi/ruokalistat/output/weekly_json/54/'+nextWeekYear+'/'+nextWeekMonth+'/'+nextWeekDate+'/fi'
      ).then(function(nextWeekMenu){
        deferred.resolve(formatMenus(thisWeekMenu.data.menus, nextWeekMenu.data.menus));
      });
    });

    return deferred.promise;
  })

  .factory('CordonComing', function ($http, $rootScope, $stateParams, $q) {
    var matchToCordon = function(course){
      var cordon = /[cg]ordon/;
      return (cordon.test(course.desc_fi.toLowerCase()) ||
        cordon.test(course.title_en.toLowerCase()) ||
        cordon.test(course.title_fi.toLowerCase()));
    };
    return {
      get: function(Menu) {
        var date = false;
        Menu.forEach(function(day){
          day.courses.forEach(function(course){
            if (matchToCordon(course)) {
              date = day.date;
            }
          });
        });
        return date;
      }
    }
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
