

// url example for refference http://api.zippopotam.us/US/29414

$(document).ready(function(){
  coordFind.init();
});

var coordFind = {
  init: function(){
    coordFind.events();
  },

  events: function(){
    $('.weatherInput').on('submit', function(event) {
      event.preventDefault();
      var search = $('input[type="text"]').val();
      $('input[type="text"]').val("");
      coordFind.zip(search);
    });
  },

  zip: function(zipCode) {
    $.ajax({
      method: 'GET',
      url: "http://api.zippopotam.us/" + "us" + "/" + zipCode,
      success: function(data) {
        console.log(data);
        var coordsToGetWeather = coordFind.buildWeatherURL(data)
        coordFind.getWeatherZip(coordsToGetWeather)
      }
    });
  },

  getWeatherZip: function(ourCoords) {
    console.log("COORDS", ourCoords);
    $.ajax({
      method: "GET",
      url: ourCoords,
      dataType: "jsonp",
      success: function (data) {
        console.log("SUCCESS", data);
        pages.addWeatherToDom(pages.buildWeatherData(data));
      }
    });
  },

  // addToDom: function(data,$target) {
  //   $target.html('');
  //   var htmlstrng = "<p class='coord'>" + "latitude:" + data.places[0]['latitude'] + "," + "longitude"+ data.places[0]['longitude']+"</p>";
  //   $target.append(htmlstrng);
  // },
  buildWeatherURL: function (data){
    return "http://api.openweathermap.org/data/2.5/weather?lat=" + data.places[0]['latitude'] + "&lon=" + data.places[0]['longitude'] + "&APPID=d4bb61d47f0ff2fa54c2fc465d28a37a"+
    "&units=imperial";
   }
  };
