let path;
$(document).ready(() => {
	
	path = $('#path').attr('content');
	
	getCountryList();
	getBestArea();
})

function test() {
	$('body').css("overflow", "hidden");
}

function test2() {
	$('body').css("overflow", "none");
}

function getCountryList() {
	$.ajax({
        url: `country/list`,
        type: "post",
        cache: false,
        dataType: "json",
        success: (data) => {
			if (data.check == "fail" || data.list.length <= 0) {
				alert('국가 목록을 불러오는데 실패하였습니다.');
				console.error('국가 목록을 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
        	$.each (data.list, function (index, el) {
                $(`#${el.continentName}CountryList`).append(returnCountryString(el));
            });
        },
        error: (xhr) => {
        	alert('국가 목록을 불러오는데 실패하였습니다.');
        	console.error(xhr.status);
        }
    });
}
function getBestArea() {
	$.ajax({
		url: `country/list/area/best`,
		type: "post",
		cache: false,
		dataType: "json",
		success: (data) => {
			if (data.check == "fail" || data.list.length <= 0) {
				alert('베스트 목록을 불러오는데 실패하였습니다.');
				console.error('베스트 목록을 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
			$.each (data.list, function (index, el) {
                $(`#bestAreaList`).append(returnBestAreaString(el));
            });
		},
		error: (xhr) => {
			alert('베스트 목록을 불러오는데 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}


function returnCountryString(country) {
	let str = `<div id="${country.englishName}" class="country" onclick="window.open('country/${country.countryNumber}', '_blank')">
	<p>${country.koreanName}</p><img src="${path}/image/country/${country.englishName}.jpg" alt=""></div>`;
	return str;
}
function returnBestAreaString(area) {
	let str = `<div class="bestArea" onclick="window.open('country/${area.countryNumber}/area/${area.areaNumber}', '_blank')">
	<p class="bestAreaName">${area.koreanName}</p>
	<img class="bestAreaImg" src="${path}/image/area/${area.countryName}_${area.englishName}.jpg" alt=""></div>`;
	return str;
}