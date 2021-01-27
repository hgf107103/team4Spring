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
    
    if(filetype=='jpg') {
        let reader = new FileReader();
        reader.onload = function(event) {
            $(`#${target}`).attr('src', event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    } else {
        alert('jpg 파일만 선택할 수 있습니다.');
        $(`#${target}Select`).val('');
        return;
    }
}

function imageReset(val, target) {
	$(`#${target}`).attr('src', '');
	$(`#${val}`).val('');
}

function formChange(title) {
	$(`.showClass`).css('display', 'none');
	$(`.formClass`).css('display', 'none');
	$(`#${title}Form`).css('display', 'block');
}

function divChange(divName) {
	$(`.showClass`).css('display', 'none');
	$(`.formClass`).css('display', 'none');
	$(`#${divName}`).css('display', 'flex');
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







//이하 장소관련 메서드
async function getPlaceList() {
    let result = await axios({
        method: 'post',
        url: `${path}/hbj/place/list`
	})
    setPlaceList(result);
}

function setPlaceList(result) {
	if (result.status == 200 && result.data.check === "success") {
		$(`#addPlaceList`).html('');
        result.data.list.forEach((val, index) => {
            $(`#addPlaceList`).append(returnPlaceString(val));
		})
		if (result.data.list.length == 0) {
			$(`#addPlaceList`).append("<p id='emptyText'>신청받은 장소가 없습니다!</p>");
		}
	}

}

async function placeAllow(placeNumber) {
	let check = confirm('정말로 등록을 허가하시겠습니따?\n주의 : 한번 허가하면 되돌릴 수 없습니다.');
	if(!check) {
		alert('취소되었습니다.');
		return;
	}

    await axios({
        method: 'post',
		url: `${path}/hbj/place/allow`,
		params: {
			placeNumber: placeNumber
		}
	})
	getPlaceList()
}

async function placeDeny(placeNumber) {
	let check = confirm('정말로 등록을 거부하시겠습니따?\n주의 : 한번 거부하면 되돌릴 수 없습니다.');
	if(!check) {
		alert('취소되었습니다.');
		return;
	}

    await axios({
        method: 'post',
		url: `${path}/hbj/place/deny`,
		params: {
			placeNumber: placeNumber
		}
	})
	getPlaceList()
}

function returnPlaceString(ob) {
	let str = `<div class="placeObject">
	<div class="placeObjectImg">
		<img src="${path}/image/place/${ob.areaName}/${ob.areaName}_${ob.englishName}.jpg">
	</div>
	<div class="placeObjectName">
		<p class="placeObjectNameTitle">장소명</p>
		<p class="placeObjectKoreanName placeObjectText">${ob.koreanName}</p>
		<p class="placeObjectEnglishName placeObjectText">${ob.englishName}</p>
	</div>
	<div class="placeObjectLatLng">
		<p class="placeObjectLatLngTitle">좌표</p>
		<p class="placeObjectLat placeObjectText">Lat : ${ob.placeLat}</p>
		<p class="placeObjectLng placeObjectText">Lng : ${ob.placeLng}</p>
	</div>
	<div class="placeObjectAction">
		<input type="button" value="등록허가" onclick="placeAllow(${ob.placeNumber})">
		<input type="button" value="등록거부" onclick="placeDeny(${ob.placeNumber})">
	</div>
	</div>`;
	return str;
}







async function getReviewList() {
    let result = await axios({
        method: 'post',
        url: `${path}/hbj/review/list`
	})
    setReviewList(result);
}

function setReviewList(result) {
	if (result.status == 200 && result.data.check === "success") {
		$(`#reviewListBox`).html('');
        result.data.list.forEach((val, index) => {
            $(`#reviewListBox`).append(returnReviewString(val));
		})
		if (result.data.list.length == 0) {
			$(`#reviewListBox`).append("<p id='emptyText'>리뷰 내역이 없습니다!</p>");
		}
	}

}

function dateFormat(date) {
    let str = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate() - 1}일`;
    return str;
}

function returnReviewString(object) {
    let str = `<div class="reviewObjectMain"><p class="reviewObjectTitle">${object.reviewTitle}</p>
    <p class="reviewObjectLike">추천수 : ${object.reviewCount}</p>
    <p class="reviewObjectText">${object.reviewText}</p>
    <p class="reviewObjectDate">${dateFormat(new Date(object.reviewDate))}</p>
    <input class="reviewObjectLikeBtn" type="button" onclick="reviewDelete(${object.reviewNumber})" value="삭제"></div>`
    return str;
}


async function reviewDelete(reviewNumber) {
	let check = confirm('정말로 리뷰를 삭제하시겠습니따?\n주의 : 한번 삭제하면 되돌릴 수 없습니다.');
	if(!check) {
		alert('취소되었습니다.');
		return;
	}

    await axios({
        method: 'post',
		url: `${path}/hbj/review/delete`,
		params: {
			reviewNumber: reviewNumber
		}
	})
	getReviewList()
}