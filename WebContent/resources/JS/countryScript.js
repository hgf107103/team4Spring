let countryNumber;
let path;

$(document).ready(() => {
	
	countryNumber = $('#countryNumber').val();
	path = $('#path').attr('content');
	callAreaList();
});

function callAreaList() {
	$.ajax({
        url: `${countryNumber}/area/list`,
        type: "post",
        cache: false,
        dataType: "json",
        success: (data) => {
        	
        	if (data.check == "fail") {
				alert('지역 목록을 불러오는데 실패하였습니다.');
				console.error('지역 목록을 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
        	
        	if (data.list.length <= 0) {
				$('#clickInfo').text('등록된 지역이 없습니다.');
				return;
			}
        	
        	$('title').text(`방구석여행기 - ${data.list[0].countryKoreanName}`);
        	
			$.each(data.list, (index, el) => {
                $(`#mainDiv`).append(returnAreaString(el));
			})
        },
        error: (xhr) => {
        	alert('지역 목록을 불러오는데 실패하였습니다.');
        	console.error(xhr.status);
        }
    });
}

function returnAreaString(area) {
	let str = `<div class="menu" onclick="location.href='${area.countryNumber}/area/${area.areaNumber}'"><p class="placeName">${area.koreanName}</p>
	<img src="${path}/image/area/${area.countryName}_${area.englishName}.jpg" alt=""></div>`;
	return str;
}