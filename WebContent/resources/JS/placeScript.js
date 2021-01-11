"use strict"
let path;
let placeNumber;

function initMap() {
    console.log('맵이 만들어졌음');
}

//시작시 함수
function readyFunction() {
    path = $('#path').attr('content');
    getPlaceInfo();
    reviewInfo();
}

//스크롤 멈춤, 재생관련 함수
function scrollStop(name) {
    return new Promise((resolve,reject) => {
        $(name).css('overflow', 'hidden');
        $(name).css('touch-action', 'none');
        return resolve(true);
    })
}
function scrollRestart(name) {
    return new Promise((resolve,reject) => {
        $(name).css('overflow', 'auto');
        $(name).css('touch-action', 'auto');
        return resolve(true);
    })
}

//지역 정보 파싱
function placeInfoPaser(object) {
    try {

        if(object.data.check != "success") {
            alert('해당 번호를 가진 데이터는 존재하지 않습니다.');
            self.close();
        }
        if(object.data.check == "success") {
            $('#placeNameTitle').text(object.data.place.koreanName);
            $('#placeCount').text(`추천수 : ${object.data.place.count}`);
            $('#placeTitleImage').attr('src', `${path}/image/place/${object.data.place.areaName}/${object.data.place.areaName}_${object.data.place.englishName}.jpg`)
            $('title').text(`방구석여행기 - ${object.data.place.koreanName}`);
            $('#placeCategory').text(object.data.place.categoryName);
            placeMapSetting(object.data.place.placeLat, object.data.place.placeLng)
            $('#reviewBoxTitle').text(object.data.place.koreanName);
        }
        return new Promise((resolve,reject) => {
            return resolve(true);
        })


    } catch (error) {

        return new Promise((resolve,reject) => {
            return reject(false);
        })

    }
}

//맵 세팅
function placeMapSetting(lat, lng) {
    let myLatLng = new google.maps.LatLng(lat, lng);

	let marker = new google.maps.Marker({
	        position: myLatLng
	    });
	const map = new google.maps.Map(document.getElementById("placeMaps"), {
	    zoom: 15,
	    center: myLatLng,
	    fullscreenControl: false,
	    zoomControl: false,
	    streetViewControl: false,
	    mapTypeControl:false
    });
    marker.setMap(map);
    map.panTo(marker.getPosition());

    google.maps.event.addListener(map,'drag',function(event) {
        map.setZoom(15);
        map.panTo(myLatLng);
    });
    google.maps.event.addListener(map,'click',function(event) {
        map.setZoom(15);
        map.panTo(myLatLng);
    });
}

async function getPlaceInfo() {
    await scrollStop('body');

    let result = await axios({
        method: 'post',
        url: ''
    })

    await placeInfoPaser(result)

    await scrollRestart('body');
}


async function countButtonClick() {
    await scrollStop('body');

    let check = await axios({
        method: 'post',
        url: `${$('#placeNumber').val()}/like/check`
    })
    console.log(check);
    if(check.data.check == 'success') {
        await checkCount(check);
        getPlaceInfo();
    }
    
    await scrollRestart('body');
}

async function checkCount(check) {
    let final;
    if (check.data.result == 'notready') {
            let con = confirm('추천하시겠습니까?');
            if (con) {
                let result = await addCount();
                final = result;
            }
            else {
                alert('취소하였습니다.');
            }
        
    }
    else if (check.data.result == 'already') {
            let con = confirm('이미 추천되어있습니다.\n추천을 삭제하시겠습니까?');
            if (con) {
                let result = await delCount();
                final = result;
            }
            else {
                alert('취소하였습니다.');
            }
    }
    return new Promise((resolve, reject) => {
        resolve(final);
    });
}


async function addCount() {
    let check = false;
    let result = await axios({
        method: 'post',
        url: `${$('#placeNumber').val()}/like/add`
    })

    if (result.data.check == "success") {
        if (result.data.result == "true") {
            alert('추천하였습니다.');
            check = true;
        }
    }

    return new Promise((resolve, reject) => {
        resolve(check);
    });
}
async function delCount() {
    let check = false;
    let result = await axios({
        method: 'post',
        url: `${$('#placeNumber').val()}/like/del`
    })
    if (result.data.check == "success") {
        if (result.data.result == "true") {
            alert('추천을 취소하였습니다.');
            check = true;
        }
    }
    return new Promise((resolve, reject) => {
        resolve(check);
    });
}





async function reviewInfo() {

    await scrollStop('body');

    let result = await axios({
        method: 'post',
        url: `${$('#placeNumber').val()}/review/info`
    })
    
    if (result.data.check == "success") {
        $('#allCount').text(result.data.allCount);

        $('#goodCountTitle').text(result.data.goodCount);
        $('#goodCount').attr('max', result.data.allCount);
        $('#goodCount').val(result.data.goodCount);

        $('#badCountTitle').text(result.data.badCount);
        $('#badCount').attr('max', result.data.allCount);
        $('#badCount').val(result.data.badCount);
        result.data.goodList.forEach((val, index) => {
            if(index == 0) $(`#goodReview`).html('');
            $(`#goodReview`).append(returnReviewSampleString(val));
        })
        if(result.data.goodList.length > 0) {
            $(`#goodReview`).append(`<input class="buttonStyle" type="button" onclick="viewGoodReview()" value="추천리뷰 보기">`);
        }
        
        result.data.badList.forEach((val, index) => {
            if(index == 0) $(`#badReview`).html('');
            $(`#badReview`).append(returnReviewSampleString(val));
        })
        if(result.data.goodList.length > 0) {
            $(`#badReview`).append(`<input class="buttonStyle" type="button" onclick="viewBadReview()" value="비추리뷰 보기">`);
        }
        
    }
    if(result.data.check == "fail") {
        alert('리뷰를 불러오는데 실패했습니다.');
        console.log(result.data.error);
    }

    await scrollRestart('body');
}


function dateFormat(date) {
    let str = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`;
    return str;
}


function returnReviewSampleString(object) {
    let str = `<div class="sampleReview">
    <p class="sampleTitle">${object.reviewTitle}</p>
    <p class="sampleText">${object.reviewText}</p>
    <p class="sampleDate">${dateFormat(new Date(object.reviewDate))}</p>
    </div>`;
    return str;
}


//리뷰 전체보기
async function viewGoodReview() {
    setReviewBack('추천', 30)
}
async function viewBadReview() {
    setReviewBack('비추천', 20)
}


function setReviewBack(name, number) {
    $('#reviewBoxBackground').css('display', 'block');
    $('#reviewBoxBackground').css('opacity', 1);
    $('#reviewBoxCategory').text(`${name}리뷰`);
    $('#reviewBoxCount').text(`${number}개`);
}




function returnLoadBox(text) {
	let str = `<div id="loadBox"><p id="loadLog">${text}</p></div>`;
	return str;
}







function writeReviewOpen() {
    $('#writeReviewBox').css('display', 'flex');
    $('#writeReviewBox').css('opacity', '1');
}