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

let formCheck = {
		categoryNumber:0,
		koreanName:"",
		englishName:"",
		imageFile:false,
		mapTouch:false,
		lat:0,
		lng:0
}

$(document).ready(() => {
	path = $('#path').attr('content');
	getInfomation();
	formCheck.toString();
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
        formCheck.imageFile = true;
    } else {
        alert('jpg 파일만 선택할 수 있습니다.');
        $('#placeImageSelect').val('');
        formCheck.imageFile = false;
        return;
    }
}

function imageReset() {
    $('#placeImage').attr('src', '');
    $('#placeImageSelect').val('');
}

"use strict";

function initMap() { 
    console.log('aaa');
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
		        console.log(event.latLng.lat() + ' : ' + event.latLng.lng());
		        myLatLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

		        marker = new google.maps.Marker({
		            position: myLatLng
		        });//맵을 클릭하면 마커가 찍힌다.
		        marker.setMap(map);
		        map.panTo(marker.getPosition());
		        $('#placeLatText').val(event.latLng.lat().toFixed(6));
		        $('#placeLngText').val(event.latLng.lng().toFixed(6));
		        formCheck.mapTouch = true;
		        formCheck.lat = event.latLng.lat().toFixed(6);
		        formCheck.lng = event.latLng.lng().toFixed(6);
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
		},
		complete: () => {
			$(`#placeCategorySelect`).change(() => {
				formCheck.categoryNumber = Number($(`#placeCategorySelect option:selected`).val());
			})
		}
	});
}



function returnCategoryString(select) {
	let str = `<option value="${select.categoryNumber}">${select.koreanName}</option>`;
	return str;
}




function submitSend() {
	if(formCheck.categoryNumber == $(`#placeCategorySelect option:selected`).val()) {
		if(formCheck.koreanName == $('#placeKoreanText').val()) {
			if(formCheck.englishName == $('#placeEnglishText').val()) {
				if(formCheck.imageFile) {
					if(formCheck.mapTouch && formCheck.lat == $('#placeLatText').val() && formCheck.lng == $('#placeLngText').val()) {
						$('#addPlaceForm').submit();
						return;
					}
					alert('주소가 잘못되었습니다.');
					return;
				}
				alert('이미지가 잘못되었습니다.');
				return;
			}
			alert('영문이름이 잘못되었습니다.');
			return;
		}
		alert('한글이름이 잘못되었습니다.');
		return;
	}
	alert('카테고리가 잘못되었습니다.');
	return;
}

function regExpKoreanName(str) {
    const idReg = new RegExp('^(?=.*[가-힣0-9])[가-힣0-9 ]{1,30}$', 'g');
    return idReg.test(str);
}
function regExpEnglishName(str) {
    const idReg = new RegExp('^(?=.*[A-Za-z0-9])[A-Za-z0-9]{1,30}$', 'g');
    return idReg.test(str);
}

function nameCheck() {
	
	if($('#placeKoreanText').val() == '' && $('#placeEnglishText').val() == '') {
		$('#placeNameLog').text('이름을 입력해 주십시오');
		$('#placeNameLog').css('color', 'rgb(255,50,50)');
		return;
	}
	if($('#placeKoreanText').val() == '') {
		$('#placeNameLog').text('한글 이름을 입력해 주십시오');
		$('#placeNameLog').css('color', 'rgb(255,50,50)');
		return;
	}
	if($('#placeEnglishText').val() == '') {
		$('#placeNameLog').text('영문 이름을 입력해 주십시오');
		$('#placeNameLog').css('color', 'rgb(255,50,50)');
		return;
	}
	
	
	if(!regExpKoreanName($('#placeKoreanText').val())) {
		$('#placeNameLog').text('한글 이름은 한글과 숫자만 입력 할 수 있습니다.');
		$('#placeNameLog').css('color', 'rgb(255,50,50)');
		return;
	}
	if(!regExpEnglishName($('#placeEnglishText').val())) {
		$('#placeNameLog').text('영문 이름은 영문과 숫자만 입력 할 수 있습니다. 영어는 띄어쓰기를 할 수 없습니다.');
		$('#placeNameLog').css('color', 'rgb(255,50,50)');
		return;
	}
	
	
	$.ajax({
		url: `name`,
		type: "post",
		cache: false,
		dataType: "json",
		data: {
			koreanName: $('#placeKoreanText').val(),
			englishName: $('#placeEnglishText').val()
		},
		beforeSend: () => {
			$('body').css('overflow', 'hidden');
			$('body').css('touch-action', 'none');
			$('body').append(returnLoadBox('이름 체크중입니다.'));
		},
		success: (data) => {
			if(data.check != 'success') {
				alert('이름 중복체크에서 오류가 발생하였습니다.');
				return;
			}
			if(data.result == "true") {
				$('#placeNameLog').text('사용이 가능한 이름입니다.');
				$('#placeNameLog').css('color', 'rgb(50,50,255)');
				
				$('#placeKoreanText').attr('readonly', true);
				$('#placeEnglishText').attr('readonly', true);
				
				formCheck.koreanName = $('#placeKoreanText').val();
				formCheck.englishName = $('#placeEnglishText').val();
				
				$('#placeNameCheck').val('확인완료');
			    $('#placeNameCheck').attr('disabled', true);
				return;
			}
			if(data.result == "kerror") {
				$('#placeNameLog').text('한글이름이 중복됩니다.');
				$('#placeNameLog').css('color', 'rgb(255,50,50)');

				$('#placeKoreanText').attr('readonly', false);
				$('#placeEnglishText').attr('readonly', true);

				formCheck.koreanName = '';
				formCheck.englishName = $('#placeEnglishText').val();
				return;
			}
			if(data.result == "eerror") {
				$('#placeNameLog').text('영문이름이 중복됩니다.');
				$('#placeNameLog').css('color', 'rgb(255,50,50)');

				$('#placeKoreanText').attr('readonly', true);
				$('#placeEnglishText').attr('readonly', false);

				formCheck.koreanName = $('#placeKoreanText').val();
				formCheck.englishName = '';
				return;
			}
			if(data.result == "aerror") {
				$('#placeNameLog').text('두 이름이 모두 중복됩니다.');
				$('#placeNameLog').css('color', 'rgb(255,50,50)');
				
				$('#placeKoreanText').attr('readonly', false);
				$('#placeEnglishText').attr('readonly', false);

				formCheck.koreanName = '';
				formCheck.englishName = '';
				return;
			}
		},
		error: (xhr) => {
			alert('이름 중복체크에 실패하였습니다.');
			console.error(xhr.status);
		}, 
		complete: () => {
			$('body').css('overflow', 'auto');
			$('body').css('touch-action', 'auto');
			$('#loadBox').detach();
			
			if($('#placeKoreanText').attr('readonly') == 'readonly') {
				$('#placeKoreanText').css('background-color', 'rgba(0,0,0,0.2)');
			} else {
				$('#placeKoreanText').css('background-color', 'rgba(255,255,255,0.1)');
			}
			if($('#placeEnglishText').attr('readonly') == 'readonly') {
				$('#placeEnglishText').css('background-color', 'rgba(0,0,0,0.2)');
			} else {
				$('#placeEnglishText').css('background-color', 'rgba(255,255,255,0.1)');
			}
		}
	});
}

function returnLoadBox(text) {
	let str = `<div id="loadBox"><p id="loadLog">${text}</p></div>`;
	return str;
}

function returnSubmitBox() {
	let str = `<div id="loadBox"><img id="loadImage" src="${path}/image/sys/loading.gif"><p id="loadLog">새로운 여행지를 제시하는 중...</p></div>`;
	return str;
}