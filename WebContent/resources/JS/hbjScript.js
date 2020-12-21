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

function menuChacng(title, kor) {
	$('#screen').html(returnFormString(title, kor));
	
	if (countryList.length <= 0 || countryList === 'undefined' || title != "area") {
		$.ajax({
			url: `hbj/category`,
			type: "post",
			cache: false,
			dataType: "json",
			data: {
				title:title
			},
			success: (data) => {
				if (data.check == "fail" || data.list.length <= 0) {
					alert('장소 구분 목록을 불러오는데 실패하였습니다.');
					console.error('장소 구분 목록을 불러오는데 실패하였습니다.');
					console.error("에러코드 : ", data.error);
					$('#screen').html('<h1>오류가 발생하였습니다.</h1>');
					return;
				}
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
	else if (countryList.length > 0 || countryList !== 'undefined') {
		$(`#${title}list`).html('');
		$.each (countryList, function (index, el) {
            $(`#${title}list`).append(returnSelectOption(el));
        });
	}
	
	let myLatLng = new google.maps.LatLng(37.512660, 127.270387);
    //지역 좌표값 저장한 다음 불러와서 지도 센터로 찍도록 할것
	
    let marker = new google.maps.Marker({
            position: myLatLng
        });
    const map = new google.maps.Map(document.getElementById("maps"), {
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
    
    
    $('#arealist').change(() => {
    	marker.setMap(null);
    	let newLatLng;
    	$.each (countryList, function (index, el) {
            if(el.number == $("#arealist option:selected").val()) {
            	newLatLng = new google.maps.LatLng(el.countryLat, el.countryLng);
            }
        });
    	map.setCenter(newLatLng);
    	map.setZoom(4);
    	
    	marker = new google.maps.Marker({
            position: newLatLng
        });
    	marker.setMap(map);
    	$(`#${title}LatText`).val(newLatLng.lat());
        $(`#${title}LngText`).val(newLatLng.lng());
    })
}

function initMap() {}

function returnFormString(title, kor) {
	let str = `<form><label><span id="listSpan">${kor}선택 : </span><select id="${title}list"></select></label>
	<div class="formdiv">
	<label><span id="listSpan">한국어이름 : </span><input type="text" autocomplete="off" id="${title}KoreanName" class="text" placeholder="한국어이름"></label>
	<br>
	<label><span id="listSpan">　영어이름 : </span><input type="text" autocomplete="off" id="${title}EnglishName" class="text" placeholder="영어이름"></label>
	</div>
	<div class="formdiv">
	<img class="imageBox" id="${title}Image"></img>
	<label><span class="button">사진업로드</span><input type="file" id="${title}ImageSelect" onchange="imageChange(event, this, '${title}Image')" value="" accept="image/jpg, image/png, image/jpeg"></label>
	<span class="button" onclick="imageReset('${title}ImageSelect', '${title}Image')">사진초기화</span>
	</div>
	<div class="formdiv">
    <div id="maps"></div>
    <label><span class="latlngLabel">위도</span><input type="text" id="${title}LatText" class="readOnlyText" placeholder="lat" value="0" readonly></label>
    <br>
    <label><span class="latlngLabel">경도</span><input type="text" id="${title}LngText" class="readOnlyText" placeholder="lng" value="0" readonly></label>
    </div>
    <div class="formdiv">
    <input class="button" type="button" value="추가하기">
    </div>
	</form>`;
	return str;
}


function returnSelectOption(select) {
	let str = `<option value="${select.number}">${select.koreanName}</option>`;
	return str;
}