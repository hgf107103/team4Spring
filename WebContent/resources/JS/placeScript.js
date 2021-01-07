"use strict"
let path;
let placeNumber;

function initMap() {
    console.log('맵이 만들어졌음');
}

function readyFunction() {
    path = $('#path').attr('content');
    getPlaceInfo();
}

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
        map.panTo(myLatLng);
    });
    google.maps.event.addListener(map,'click',function(event) {
        map.panTo(myLatLng);
    });
}

async function getPlaceInfo() {
    let stop = await scrollStop('body');

    let result = await axios({
        method: 'post',
        url: ''
    })

    let check = await placeInfoPaser(result)

    let re = await scrollRestart('body');
}


async function countButtonClick() {
    await scrollStop('body');

    let check = await axios({
        method: 'post',
        url: `${$('#placeNumber').val()}/like/check`
    })
    
    if(check.data.check == 'success') {
        await addCount(check);
    }
    
    await scrollRestart('body');
}

function addCount(check) {

    if (check.data.result == 'already') {
        return new Promise((resolve, reject) => {
            let con = confirm('추천하시겠습니까?');
            if (con) {
                
                resolve(true);
            }
            else {
                alert('취소하였습니다.')
                reject(false);
            }
        });
    }
    else if (check.data.result == 'notready') {
        return new Promise((resolve, reject) => {
            let con = confirm('이미 추천되어있습니다.\n추천을 삭제하시겠습니까?');
            if (con) {
                let result = await axios({
                    method: 'post',
                    url: `${$('#placeNumber').val()}/like/check`
                })
                resolve(true);
            }
            else {
                alert('취소하였습니다.')
                reject(false);
            }
        });
    }
    

    
}
function delCount(check) {
    
}


function returnLoadBox(text) {
	let str = `<div id="loadBox"><p id="loadLog">${text}</p></div>`;
	return str;
}