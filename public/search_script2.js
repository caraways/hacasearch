var properties = {};
var map;

$(document).ready(function() {
  // init map
  map = initMap();
  var titleLayer = initTitleLayer();
  L.control
    .zoom({
      position: "bottomright"
    })
    .addTo(map);

  titleLayer.addTo(map);

  getAllProperties();
}); // get_all_properties function

function getAllProperties() {
  $.get(data_hub_api_endpoint, function(response) {
    console.log(response);
    var propertiesTemp = response.data;

    for (var property of propertiesTemp) {
      console.log(property);
      if (property.lat && property.longitude) {
        properties[property.id] = property;
        var marker = L.marker([
          parseFloat(property.lat),
          parseFloat(property.longitude)
        ]).addTo(map);
        console.log("latitude" + property.lat);
      }
    }
  });
}

function returnMap() {
  return map;
}

function initMap() {
  mymap = L.map("mapid", { zoomControl: false }).setView(
    [30.2613, -97.7408],
    12.5
  );
  return mymap;
}

function initTitleLayer() {
  return L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      // accessToken: 'pk.eyJ1Ijoicm1hdGh1cjEwMSIsImEiOiJjajg3a3I0cjIwb2lqMndtdGVtaWx1ZjZrIn0.iEel0XmzyrU4fz78lEQ3GQ'
      accessToken: mapbox_public_key
    }
  );
}

// heart, home, or star are icon types
function assignMarker(color, iconType = "home") {
  return L.AwesomeMarkers.icon({
    icon: iconType,
    markerColor: color,
    iconSize: [35, 45]
  });
}

var tempMarker = null;
var tempLat = null;
var tempLong = null;
var tempMarkerId = null;
