$(document).ready(() => {
	$.ajax({
        url: `country/list`,
        type: "post",
        cache: false,
        dataType: "json",
        success: (data) => {
        	$.each (data.list, function (index, el) {
                $(`#${el.continentName}CountryList`).append(returnCountryString(el));
            });
        },
        error: () => {
    		alert('오류가 발생하였습니다.');
        	console.log('알 수 없는 이유로 로그인에 실패했습니다.');
        }
    });
	$.ajax({
		url: `country/1/area/list`,
		type: "post",
		cache: false,
		dataType: "json",
		success: (data) => {
			console.log(data)
		},
		error: () => {
			alert('오류가 발생하였습니다.');
			console.log('알 수 없는 이유로 로그인에 실패했습니다.');
		}
	});
})

function returnCountryString(country) {
	let str = `<div id="${country.englishName}" class="country" onclick="window.open('country/${country.countryNumber}', '_blank')">
	<p>${country.koreanName}</p><img src="resources/image/country/${country.englishName}.jpg" alt=""></div>`;
	return str;
}