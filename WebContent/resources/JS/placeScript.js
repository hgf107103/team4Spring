"use strict"
let path;
let placeNumber;

//리뷰쪽에서 쓰는 변수
let goodReviewCount;
let badReviewCount;


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
    //console.log(check);
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
        goodReviewCount = result.data.goodCount;

        $('#badCountTitle').text(result.data.badCount);
        $('#badCount').attr('max', result.data.allCount);
        $('#badCount').val(result.data.badCount);
        badReviewCount = result.data.badCount;

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
        if(result.data.badList.length > 0) {
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
    let str = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate() - 1}일`;
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
let categoryChangeCategory = ''; //정렬할때 쓸 변수

//카테고리 변경
async function viewGoodReview() {
    await setReviewBack('추천', goodReviewCount);
    categoryChangeCategory = 'good';
    reviewCategoryChange();
}
//카테고리 변경
async function viewBadReview() {
    await setReviewBack('비추천', badReviewCount);
    categoryChangeCategory = 'bad';
    reviewCategoryChange();
}

//bad good 변경하고 리스트를 받아와서 다음 메소드에 전달
async function reviewCategoryChange() {
    let object = await getReviewAllList(categoryChangeCategory);
    settingReviewList(object);
}

//받아온 리뷰 리스트 오브젝트 화면에 세팅
function settingReviewList(object) {
    if (object.status == 200 && object.data.check === "success") {
        $(`#reviewBoxList`).html('');
        object.data.list.forEach((val, index) => {
            $(`#reviewBoxList`).append(returnReviewString(val));
        })
    }
}

//리뷰창 띄우기
function setReviewBack(name, number) {
    $('#reviewBoxBackground').css('display', 'grid');
    $('#reviewBoxBackground').css('opacity', 1);
    $('#reviewBoxCategory').text(`${name}리뷰`);
    $('#reviewBoxCount').html(`리뷰 수 : <span id="reviewBoxCountSpan">${number}</span>`);

    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

//조건에 맞는 리뷰 리스트 불러오기
async function getReviewAllList(category) {
    let getUrl = `${$('#placeNumber').val()}/review/${category}`;
    //console.log($("#reviewBoxOrder option:selected").val());
    let result = await axios({
        method: 'post',
        url: getUrl,
        params: {
            reviewOrder: $("#reviewBoxOrder option:selected").val()
        }
    })
    return result;
}

function returnReviewString(object) {
    let str = `<div class="reviewObjectMain"><p class="reviewObjectTitle">${object.reviewTitle}</p>
    <p class="reviewObjectLike">추천수 : ${object.reviewCount}</p>
    <p class="reviewObjectText">${object.reviewText}</p>
    <p class="reviewObjectDate">${dateFormat(new Date(object.reviewDate))}</p>
    <input class="reviewObjectLikeBtn" type="button" onclick="reviewLike(${object.reviewNumber})" value="추천"></div>`
    return str;
}

//리뷰창 닫기
function outReviewListBox() {
    $('#reviewBoxBackground').css('display', 'none');
    $('#reviewBoxBackground').css('opacity', 0);
    $('#reviewBoxCategory').text(``);
    $('#reviewBoxCount').html(``);
}

//리뷰추천
async function reviewLike(reviewNumber) {
    let result = await axios({
        method: 'post',
        url: `${$('#placeNumber').val()}/review/${reviewNumber}/like`
    })
    if (result.data.check == "success" && result.data.result != "") {
        if (result.data.result == "already") {
            alert('이미 추천한 리뷰입니다.');
        }
        if (result.data.result == "okay") {
            alert('추천했습니다.');
        }
        if (result.data.result == "likeError") {
            alert('추천에 실패했습니다.');
        }
        if (result.data.result == "notUser") {
            alert('로그인이 필요합니다.');
            return;
        }
    }
    if (result.data.check == "fail") {
        alert('오류가 발생하였습니다.');
        console.error(result.data.error);
    }
    reviewCategoryChange();
}





//이하 리뷰 쓰기 함수
function writeReviewOpen() {
    $('#writeReviewBox').css('display', 'flex');
    $('#writeReviewBox').css('opacity', '1');
}

function writeTextLengthCheck() {
    if ($('#writeReviewText').val().length <= 400) {
        $('#writeReviewTextCount').text(`${$('#writeReviewText').val().length} / 400`);
    }
    if ($('#writeReviewText').val().length > 400) {
        let text = $('#writeReviewText').val().substring(0,400);
        $('#writeReviewText').val(text);
    }
}

function writeClose() {
    $('#writeReviewBox').css('opacity', '0');
    $('#writeReviewBox').css('display', 'none');
    $('#writeReviewText').val('');
    $('#writeReviewTitle').val('');
    $('#writeReviewTextCount').text('0 / 400');
}



async function writeSubmit() {
    if ($('#writeReviewTitle').val() == '') {
        alert('제목을 입력해주십시오');
        return;
    }
    if ($('#writeReviewText').val() == '') {
        alert('내용을 입력해주십시오');
        return;
    }

    let title = wordReplace($('#writeReviewTitle').val());
    let text = wordReplace($('#writeReviewText').val());
    let category = $(".writeReviewCategory:checked").val();

    /*console.log(title);
    console.log(text);
    console.log(category);*/

    let result = await axios({
        method: 'post',
        url: `${$('#placeNumber').val()}/review/add`,
        params: {
            reviewTitle: title,
            reviewText: text,
            reviewCategory: category
        }
    })

    //console.log(result);

    if (result.status == 200 && result.data.check == "success") {
        alert('리뷰가 등록되었습니다.');
    }
    else if (result.status != 200 || result.data.check == "fail") {
        alert('리뷰가 등록되지 않았습니다.');
    }

    writeClose();
    reviewInfo();
}


function wordReplace(text) {
    let one = text.replace(/(\r\n\t|\n|\r\t)/gm," ");//개행
    let two = one.replace(/([<|>$%&#])/gm, "");
    let thr = two.replace(/(  )/gm, " ");
    for (let index = 0; index < 5; index++) {
        thr = thr.replace(/(  )/gm, " ");
    }
    let result = thr.replace(/(  )/gm, " ");
    return result;
}




function returnLoadBox(text) {
	let str = `<div id="loadBox"><p id="loadLog">${text}</p></div>`;
	return str;
}