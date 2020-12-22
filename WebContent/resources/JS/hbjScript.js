let path;

$(document).ready(() => {
	path = $('#path').attr('content');
	categorySet("country");
	categorySet("area");
	mapSetting("country")
	mapSetting("area")
})

class country {
    constructor(number, koreanName, englishName, countryLat, countryLng) {
        this.number = number;
        this.koreanName = koreanName;
        this.englishName = englishName;
        this.countryLat = countryLat;
        this.countryLng = countryLng;
    }
}

let countryList = new Array;


function imageChange(event, val, target) {
    pathpoint = $(val).val().lastIndexOf('.');
    filepoint = $(val).val().substring(pathpoint+1,$(val).val().length);
    filetype = filepoint.toLowerCase();
    
    if(filetype=='png' || filetype=='jpeg' || filetype=='jpg') {
        let reader = new FileReader();
        reader.onload = function(event) {
            $(`#${target}`).attr('src', event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    } else {
        alert('jpg, jpeg, png 파일만 선택할 수 있습니다.');
        $(`#${target}Select`).val('');
        return;
    }
}

function imageReset(val, target) {
	$(`#${target}`).attr('src', '');
	$(`#${val}`).val('');
}

function menuChacng(title) {
	$(`.formClass`).css('display', 'none');
	$(`#${title}Form`).css('display', 'block');
}

function initMap() {}


function returnSelectOption(select) {
	let str = `<option value="${select.number}">${select.koreanName}</option>`;
	return str;
}


function categorySet(title) {
	$.ajax({
		url: `${path}/hbj/category`,
		type: "post",
		cache: false,
		dataType: "json",
		data: {
			title:title
		},
		success: (data) => {
			$.each (data.list, function (index, el) {
                $(`#${title}list`).append(returnSelectOption(el));
                if(title == "area") {
                	countryList.push(new country(el.number, el.koreanName, el.englishName, el.countryLat, el.countryLng));
                }
            });
		},
		error: (xhr) => {
			alert('장소 구분 목록을 불러오는데 실패하였습니다.');
			console.error(xhr.status);
			$('#screen').html('<h1>오류가 발생하였습니다.</h1>');
		}
	});
}


function mapSetting(title) {
	let myLatLng = new google.maps.LatLng(37.512660, 127.270387);
    //지역 좌표값 저장한 다음 불러와서 지도 센터로 찍도록 할것
	
    let marker = new google.maps.Marker({
            position: myLatLng
        });
    const map = new google.maps.Map(document.getElementById(`${title}Map`), {
        zoom: 2,
        center: myLatLng,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl:false
    });

    google.maps.event.addListener(map,'click',function(event) {
        marker.setMap(null);//기존마커를 삭제하는 구문
        
        myLatLng = new google.maps.LatLng(event.latLng.lat().toFixed(6), event.latLng.lng().toFixed(6));

        marker = new google.maps.Marker({
            position: myLatLng
        });//맵을 클릭하면 마커가 찍힌다.
        //console.log(myLatLng.lat());
        //console.log(myLatLng.lng());
        marker.setMap(map);
        
        map.panTo(marker.getPosition());
        
        $(`#${title}LatText`).val(event.latLng.lat().toFixed(6));
        $(`#${title}LngText`).val(event.latLng.lng().toFixed(6));
    });
    
    if(title != 'area') {
    	return;
    }
    $('#arealist').change(() => {
    	if($("#arealist option:selected").val() == 0) {
    		return;
    	}
    	marker.setMap(null);
    	let newLatLng;
    	$.each (countryList, function (index, el) {
            if(el.number == $("#arealist option:selected").val()) {
            	newLatLng = new google.maps.LatLng(el.countryLat, el.countryLng);
            	nowCountry = el;
            	console.log(nowCountry);
            }
        });
    	map.setCenter(newLatLng);
    	map.setZoom(4);
    	
    	marker = new google.maps.Marker({
            position: newLatLng
        });
    	marker.setMap(map);
    	$(`#areaLatText`).val(newLatLng.lat());
        $(`#areaLngText`).val(newLatLng.lng());
    })
}



function areaAdd() {
	if($("#arealist option:selected").val() == "0") {
		alert('나라를 선택해 주십시오');
		return;
	}
	if($("#areaLatText").val() == "0" || $("#areaLngText").val() == "0") {
		alert('지도에서 지역을 선택해 주십시오');
		return;
	}
	if($(`#areaImageSelect`).val() == '') {
		alert('이미지를 업로드해주십시오');
		return;
	}
	if($('areaKoreanName').val() == '' || $('areaEnglishName').val() == '') {
		alert('이름을 입력해주십시오');
		return;
	}
	let formData = new FormData(document.getElementById("areaForm"));
	formData.append("countryNumber", $("#arealist option:selected").val());
	formData.append("countryName", nowCountry.englishName);
	formData.append("koreanName", $('#areaKoreanName').val());
	formData.append("englishName", $('#areaEnglishName').val());
	formData.append("areaLat", $("#areaLatText").val());
	formData.append("areaLng", $("#areaLngText").val());
	formData.append("upload", document.getElementById('areaImageSelect').files[0]);
	
	$.ajax({
		url: `/${path}/hbj/add/area`,
		type: "post",
		cache: false,
		dataType: "json",
		processData: false,
		contextType: false,
		enctype: "multipart/form-data",
		data: formData,
		beforeSend: () => {
			$('#screen').html('<h1>서버와 통신중입니다.</h1>');
		},
		success: (data) => {
			if (data.check == "false" || data.check == "fail") {
				alert('지역추가 실패하였습니다.');
				console.error('지역추가 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				$('#screen').html('<h1>오류가 발생하였습니다.</h1>');
				return;
			}

			$('#screen').html('<h1>메뉴를 선택해주십시오</h1>');
		},
		error: (xhr) => {
			alert('지역추가 실패하였습니다.');
			console.error(xhr.status);
			$('#screen').html('<h1>오류가 발생하였습니다.</h1>');
		}
	});
}



function formSubmit(title) {
	if($(`#${title}list option:selected`).val() == "0") {
		alert('나라를 선택해 주십시오');
		return;
	}
	if($(`#${title}LatText`).val() == "0" || $(`#${title}LngText`).val() == "0") {
		alert('지도에서 지역을 선택해 주십시오');
		return;
	}
	if($(`#${title}ImageSelect`).val() == '') {
		alert('이미지를 업로드해주십시오');
		return;
	}
	if($(`#${title}KoreanName`).val() == '' || $(`#${title}EnglishName`).val() == '') {
		alert('이름을 입력해주십시오');
		return;
	}
	let check = confirm('정말로 전송하시겠습니까?');
	
	
	if(check) {
		$(`#${title}Form`).submit();
	}
}