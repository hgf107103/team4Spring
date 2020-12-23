/*
    받아야 하는 항목
    좌표 : 위도 경도 lat lng
    장소이름 : 한글이름 (장소는 한글만 나라, 지역은 영어도)
    사진 : 사진 path와 확장자(확장자 확인해서 이미지인지 아닌지 확인해야하기 때문)
    API 엑세스 키
    장소 구분 : 음식 쇼핑 관광 (영어로 받는게 나을 듯 함)
*/
let countryNumber;
let areaNumber;
let path;



$(document).ready(() => {
	path = $('#path').attr('content');
	getInfomation();
})

function imageChange(event) {

    pathpoint = $('#placeImageSelect').val().lastIndexOf('.');
    filepoint = $('#placeImageSelect').val().substring(pathpoint+1,$('#placeImageSelect').val().length);
    filetype = filepoint.toLowerCase();
    
    if(filetype=='jpg') {
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
    $('#placeImageSelect').val('');
}

"use strict";

function initMap() { 
    
}

function getInfomation() {
	
	countryNumber = $('#countryNumber').val();
	areaNumber = $('#areaNumber').val();
	let lat = 0;
	let lng = 0;
	
	$.ajax({
		url: `${path}/country/${countryNumber}/area/${areaNumber}`,
		type: "post",
		cache: false,
		dataType: "json",
		success: (data) => {
			$('#areaNameText').val(data.area.koreanName);
			lat = data.area.areaLat;
			lng = data.area.areaLng;
		},
		error: (xhr) => {
			alert('지역 정보를 불러오는데 실패하였습니다.');
			console.error(xhr.status);
		},
		complete:() => {
			let myLatLng = new google.maps.LatLng(lat, lng);
		    //지역 좌표값 저장한 다음 불러와서 지도 센터로 찍도록 할것
		    let marker = new google.maps.Marker({
		            position: myLatLng
		        });
		    const map = new google.maps.Map(document.getElementById("maps"), {
		        zoom: 9,
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
		        $('#placeLatText').val(event.latLng.lat().toFixed(6));
		        $('#placeLngText').val(event.latLng.lng().toFixed(6));
		    });
		}
	});
	
	$.ajax({
		url: `${path}/category`,
		type: "post",
		cache: false,
		dataType: "json",
		success: (data) => {
			$.each (data.list, function (index, el) {
                $(`#placeCategorySelect`).append(returnCategoryString(el));
            });
		},
		error: (xhr) => {
			alert('지역 정보를 불러오는데 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}



function returnCategoryString(select) {
	let str = `<option value="${select.categoryNumber}">${select.koreanName}</option>`;
	return str;
}




function testSend() {
	$.ajax({
		url: `${path}/insert`,
		type: "post",
		cache: false,
		processData: false,
		contextType: false,
		enctype: "multipart/form-data",
		data: {
			koreanName:$('#placeKoreanText').val(),
			englishName:$('#placeEnglishText').val(),
			categoryName:$("#placeCategorySelect option:selected").val(),
			imageFile:document.getElementById('placeImageSelect').files[0]
		},
		dataType: "json",
		success: (data) => {
			console.log(data);
		},
		error: (xhr) => {
			console.error(xhr.status);
		}
	});
}