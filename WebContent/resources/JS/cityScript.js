/*let Y_point = 37.555166;
let X_point = 126.970916;
let zoomLevel = 13;
let markerMaxWidth = 100;

let myLatlng = new google.maps.LatLng(Y_point, X_point);
let mapOptions = {
	zoom: zoomLevel,
	center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP};

let map = new google.maps.Map(document.getElementById('cityMap'), mapOptions);
var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "샘플"
});

var infowindow = new google.maps.InfoWindow(

    {
        content: "contentString",
        maxWidth: markerMaxWidth
    }

);

google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
});*/