/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

//create a new InfoWindow
var infoWin = new google.maps.InfoWindow();

var mapOptions = {
	center: {lat: 47.655, lng: -122.3080 },
	zoom: 14 //0=Earth to 21=max zoom
};

var mapElem = document.getElementById('map');

//create the map
var map = new google.maps.Map(mapElem, mapOptions);

//marker positions
//values MUST be numbers and not strings

var position = {
	lat: 47.655,
	lng: -122.3080
};

//create a marker on the map
//position and map are the minimum you need for a marker.
var marker = new google.maps.Marker({
	position: position,
	map: map
});

//remove marker from the map
//this call basically sets the call to nothing
//marker still exists, but this just removes it visually.
marker.setMap(null);


//This just readds the maker from memory to the map.
//marker.setMap(map);

function onGeoPos(position) {
	console.log("Lat: " + position.coords.latitutde);
	console.log("Lng: " + position.coords.longitude);

	var myLocPos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};

	var myLocation = new google.maps.Marker({
		position: myLocPos,
		map: map
	});

	//set the content (may contain html tags)
	infoWin.setContent(
		'<p>Hello World! My lat is '
		+ position.coords.latitude
		+ ' and my lng is ' 
		+ position.coords.longitude
		+ '</p>'
		);

	//listen for click event on marker
	google.maps.event.addListener(myLocation, 'click', onMarkerClick)
}

function onGeoErr(error) {
	//error code here
}

if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(onGeoPos, onGeoErr,
		{enableHighAccuracy: true, maximumAge: 30000}); //the maximumAge makes it so the loading does not eat the battery of device.

} else {
	console.log("geolocation not supported");
}

function onMarkerClick() {
	//'this' keyword will refer to the marker object

	//pan the map so that the marker is at the center
	map.panTo(this.getPosition());
	infoWin.open(map, this);
}

$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
	.done(function(data) {
		//success
		console.log(data);
	})
	.fail(function(error) {
		//error contains error info
	})
	.always(function() {
		//called on either sucess or error cases
	})


