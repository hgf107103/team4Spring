/*
    받아야 하는 항목
    좌표 : 위도 경도 lat lng
    장소이름 : 한글이름 (장소는 한글만 나라, 지역은 영어도)
    사진 : 사진 path와 확장자(확장자 확인해서 이미지인지 아닌지 확인해야하기 때문)
    API 엑세스 키
    장소 구분 : 음식 쇼핑 관광 (영어로 받는게 나을 듯 함)
*/

function imageChange(event) {

    pathpoint = $('#placeImageSelect').val().lastIndexOf('.');
    filepoint = $('#placeImageSelect').val().substring(pathpoint+1,$('#placeImageSelect').val().length);
    filetype = filepoint.toLowerCase();
    
    if(filetype=='png' || filetype=='jpeg') {
        let reader = new FileReader();
        reader.onload = function(event) {
            $('#placeImage').attr('src', event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    } else {
        alert('jpg, jpeg, png 파일만 선택할 수 있습니다.');
        $('#placeImageSelect').val('');
        return;
    }
}

function imageReset() {
    $('#placeImage').attr('src', '');
}

"use strict";

function initMap() {

            
    let myLatLng = new google.maps.LatLng(37.512660, 127.270387);
    //지역 좌표값 저장한 다음 불러와서 지도 센터로 찍도록 할것
    let marker = new google.maps.Marker({
            position: myLatLng
        });
    const map = new google.maps.Map(document.getElementById("maps"), {
        zoom: 8,
        center: myLatLng,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl:false
    });

    google.maps.event.addListener(map,'click',function(event) {
        marker.setMap(null);
        console.log(event.latLng.lat() + '' + event.latLng.lng());
        myLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

        marker = new google.maps.Marker({
            position: myLatLng
        });//맵을 클릭하면 마커가 찍힌다.
        marker.setMap(map);
        map.panTo(marker.getPosition());
        $('#placeLatText').val(event.latLng.lat());
        $('#placeLngText').val(event.latLng.lng());
    });
}