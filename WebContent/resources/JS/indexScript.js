let path; 

function readyFunction() {
	path = $('#path').attr('content');
	countryList();
	bestArea();
}

async function countryList() {
	try {

		let country = await axios({
			method: 'post',
			url: 'country/list'
		});

		if (country.status == 200 && country.data.check === "success") {
			country.data.list.forEach((val, index) => {
				$(`#${val.continentName}CountryList`).append(returnCountryString(val));
			})
		}

		if (country.data.check != "success") {
			alert('국가 목록을 불러오는데 실패하였습니다.');
			console.error('국가 목록을 불러오는데 실패하였습니다.');
		}

	} catch (error) {
		alert('국가 목록 오류가 발생했습니다.');
		console.error('국가 목록 오류');
		console.error(error)
	}
}

async function bestArea() {
	try {
		let best = await axios({
			method: 'post',
			url: 'country/list/area/best'
		})

		if (best.status == 200 && best.data.check === "success") {
			best.data.list.forEach((val, index) => {
                $(`#bestAreaList`).append(returnBestAreaString(val));
			})
		}

		if (best.data.check != "success") {
			alert('베스트 목록을 불러오는데 실패하였습니다.');
			console.error('베스트 목록을 불러오는데 실패하였습니다.');
		}

	} catch (error) {
		alert('베스트 목록 오류가 발생하였습니다.')
		console.error('베스트 목록 오류');
		console.error(error)
	}
}

/*function getCountryList() {
	let check = false;
	$.ajax({
        url: `country/list`,
        type: "post",
		cache: false,
		async: false,
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
			check = true;
        },
        error: (xhr) => {
        	alert('국가 목록을 불러오는데 실패하였습니다.');
        	console.error(xhr.status);
		},
		complete: ()=> {
			console.log(2)
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
            });
		},
		error: (xhr) => {
			alert('베스트 목록을 불러오는데 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}*/


function returnCountryString(country) {
	let str = `<div id="${country.englishName}" class="country" onclick="location.href = 'country/${country.countryNumber}'">
	<p>${country.koreanName}</p><img src="${path}/image/country/${country.englishName}.jpg" alt=""></div>`;
	return str;
}
function returnBestAreaString(area) {
	let str = `<div class="bestArea" onclick="location.href = 'country/${area.countryNumber}/area/${area.areaNumber}'">
	<p class="bestAreaName">${area.koreanName}</p>
	<img class="bestAreaImg" src="${path}/image/area/${area.countryName}_${area.englishName}.jpg" alt=""></div>`;
	return str;
}


function areaSearch() {
	if($('#searchText').val() == '') {
		$('#searchResultBox').html('<p class="searchResult" id="searchEmpty">검색어를 입력하세요</p>');
		return;
	}
	
	$.ajax({
		url: `${path}/search`,
		type: "post",
		cache: false,
		data: {
			searchText: $('#searchText').val()
		},
		beforeSend: () => {
			$('#searchText').attr('readonly', true);
			$('#searchResultBox').html('');
		},
		dataType: "json",
		success: (data) => {
			console.log(data)
			if (data.check == "fail" || data.list.length < 0) {
				alert('검색에 실패하였습니다.');
				console.error('검색에 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
			
			if (data.list.length == 0) {
				$('#searchResultBox').append('<p class="searchResult" id="searchEmpty">검색결과가 없습니다.</p>');
				return;
			}
			
			$.each (data.list, function (index, el) {
                $('#searchResultBox').append(getSearchString(el));
            });
		},
		error: (xhr) => {
			alert('검색에 실패하였습니다.');
			console.error(xhr.status);
		},
		complete: () => {
			$('#searchText').attr('readonly', false);
			$('#searchText').val('');
		}
	});
}



function getSearchString(search) {
	let str = `<p class="searchResult" onclick="searchMove(${search.countryNumber}, ${search.areaNumber})">${search.koreanName}</p>`;
	return str;
}


function searchMove(countryNumber, areaNumber) {
	location.href = `${path}/country/${countryNumber}/area/${areaNumber}`;
}