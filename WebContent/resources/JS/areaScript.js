let path;
let areaNumber;
let areaName;

$(document).ready(()=>{
	path = $('#path').attr('content');
	areaNumber = $('#areaNumber').attr('content');
	getCategory();
	getArea();
	getPlace();
})

function getCategory() {
	$.ajax({
		url: `${path}/category`,
		type: "post",
		cache: false,
		dataType: "json",
		success: (data) => {
			if (data.check == "fail" || data.list.length <= 0) {
				alert('장소 구분 목록을 불러오는데 실패하였습니다.');
				console.error('장소 구분 목록을 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
			$.each (data.list, function (index, el) {
                $(`#categoryButtonMenu`).append(returnCategoryString(el));
            });
		},
		error: (xhr) => {
			alert('장소 구분 목록을 불러오는데 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}

function returnCategoryString(category) {
	let str = `<label><input type="radio" name="categoryRadio" class="categorySelect" value="${category.categoryNumber}"><span onclick="getAgainList()">${category.koreanName}</span></label>`;
	return str;
}

function getArea() {
	$.ajax({
		url: ``,
		type: "post",
		cache: false,
		dataType: "json",
		success: (data) => {
			if (data.check == "fail") {
				alert('정보를 불러오는데 실패하였습니다.');
				console.error('정보를 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
			areaName = data.area.englishName;
			$('#areaNameTitle').text(`${data.area.koreanName}`);
			$('#areaTitleImage').attr('src', `${path}/resources/image/area/${data.area.countryName}_${data.area.englishName}.jpg`);
			$('title').text(`방구석여행기 - ${data.area.koreanName}`);
		},
		error: (xhr) => {
			alert('정보를 불러오는데 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}


function getPlace() {
	$.ajax({
		url: `${areaNumber}/place/list`,
		type: "post",
		data: {
			order:$(":input:radio[name=orderRadio]:checked").val(),
			categoryNumber:$(":input:radio[name=categoryRadio]:checked").val()
		},
		cache: false,
		dataType: "json",
		success: (data) => {
			console.log(data);
			if (data.check == "fail") {
				alert('장소 목록을 불러오는데 실패하였습니다.');
				console.error('장소 목록을 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
			if(data.list.length > 0) {
				$('#placeList').html('');
			}
			$.each (data.list, function (index, el) {
				if(el.placeCheck) {
	                $(`#placeList`).append(returnPlaceString(el));
				}
            });
		},
		error: (xhr) => {
			alert('장소 목록을 불러오는데 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}

function returnPlaceString(place) {
	let str = `<div class="place"><div class="placeImage"><img src="${path}/resources/image/place/${areaName}_${place.englishName}.jpg" alt=""></div>
	<p class="placeScore">추천수 : ${place.count}</p><p class="placeName">${place.koreanName}</p><p class="placeCategory">${place.categoryName}</p></div>`;
	return str;
	
}



function getAgainList() {
	setTimeout(() => {
		getPlace()
		}, 1);
}