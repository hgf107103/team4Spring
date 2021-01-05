let path;
let areaNumber;
let areaName;

$(document).ready(()=>{
	path = $('#path').attr('content');
	areaNumber = $('#areaNumber').attr('content');
	getCategory();
	getArea();
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
				self.close();
				return;
			}
			areaName = data.area.englishName;
			$('#areaNameTitle').text(`${data.area.koreanName}`);
			$('#areaTitleImage').attr('src', `${path}/image/area/${data.area.countryName}_${data.area.englishName}.jpg`);
			$('title').text(`방구석여행기 - ${data.area.koreanName}`);
		},
		error: (xhr) => {
			alert('정보를 불러오는데 실패하였습니다.');
			console.error(xhr.status);
			self.close();
		},
		complete:() => {
			getPlace();
		}
	});
}


/*let placeFunction = getPlace();

function emptyFunction() {
	console.log('빈 함수');
}*/

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
		beforeSend: () => {
			$('body').css('overflow', 'hidden');
			$('body').css('touch-action', 'none');
			$('#placeList').html('');
		},
		success: (data) => {
			if (data.check == "fail") {
				alert('장소 목록을 불러오는데 실패하였습니다.');
				console.error('장소 목록을 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
			}
			if(data.list.length == 0) {
				$('#placeList').append('<h2 id="placeEmpty">등록된 장소가 없습니다.</h2>');
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
		},
		complete: () => {
			$('body').css('overflow', 'auto');
			$('body').css('touch-action', 'auto');
		}
	});
}

function returnPlaceString(place) {
	let str = `<div class="place"><div class="placeImage" onclick="window.open('${areaNumber}/place/${place.placeNumber}', '_blank');"><img src="${path}/image/place/${areaName}/${areaName}_${place.englishName}.jpg" alt=""></div>
	<p class="placeScore">추천수 : ${place.count}</p><p class="placeName">${place.koreanName}</p><p class="placeCategory">${place.categoryName}</p></div>`;
	return str;
	
}

function addBookmark() {
	
	$.ajax({
		url: `${path}/bookmark/add`,
		type: "post",
		data: {
			areaNumber:$('#areaNumber').attr('content')
		},
		cache: false,
		dataType: "json",
		beforeSend: () => {
			$('body').css('overflow', 'hidden');
			$('body').css('touch-action', 'none');
		},
		success: (data) => {
			if (data.check == "fail") {
				alert('북마크 추가에 실패하였습니다.');
				console.error('북마크 추가에 실패하였습니다.');
				console.error("에러코드 : ", data.error);
			}
			if (data.result == "true") {
				alert('북마크에 추가했습니다.');
				$('#bookmarkBar').html('');
			}
			if (data.result == "already") {
				removeBookmark();
			}
		},
		error: (xhr) => {
			alert('북마크 추가에 실패하였습니다.');
			console.error(xhr.status);
		},
		complete: () => {
			$('body').css('overflow', 'auto');
			$('body').css('touch-action', 'auto');
		}
	});
}




function removeBookmark() {
	$.ajax({
		url: `${path}/bookmark/remove`,
		type: "post",
		data: {
			areaNumber:$('#areaNumber').attr('content')
		},
		cache: false,
		dataType: "json",
		success: (data) => {
			if (data.check == "fail") {
				alert('북마크 삭제에 실패하였습니다.');
				console.error('북마크 삭제에 실패하였습니다.');
				console.error("에러코드 : ", data.error);
			}
			if (data.result == "true") {
				alert('북마크를 삭제했습니다.');
				$('#bookmarkBar').html('');
			}
			if (data.result == "already") {
				alert('원래 존재하지않는 북마크입니다.');
				$('#bookmarkBar').html('');
			}
		},
		error: (xhr) => {
			alert('북마크 삭제에 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}


function getAgainList() {
	setTimeout(() => {
		getPlace();
	}, 1);
}