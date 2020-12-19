function userLogin(path) {	
	$.ajax({
		url: `${path}/user/login`,
		type: "post",
		cache: false,
		data: {
			userID:$('#loginID').val(),
			userPassword:$('#loginPWD').val()
		},
		dataType: "json",
		success: (data) => {
			if(data.check != "success") {
				alert('로그인에 실패하였습니다.');
				console.error(data.error);
				return;
			}
			if(data.result == "idworng" && data.check == "success") {
				alert('아이디가 다릅니다.');
				return;
			}
			if(data.result == "pwdworng" && data.check == "success") {
				alert('비밀번호가 다릅니다.');
				return;
			}
			if(data.result == "loginOK" && data.check == "success") {
				alert('로그인되었습니다.');
				location.reload();
				return;
			}
		},
		error: (xhr) => {
			alert('로그인에 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}

function userLogout(path) {	
	$.ajax({
		url: `${path}/user/logout`,
		type: "post",
		cache: false,
		dataType: "json",
		success: (data) => {
			if(data.check != "success") {
				alert('로그아웃에 실패하였습니다.');
				console.error(data.error);
				return;
			}
			if(data.check == "success") {
				alert('로그아웃하셨습니다.');
				location.reload();
				return;
			}
		},
		error: (xhr) => {
			alert('로그인에 실패하였습니다.');
			console.error(xhr.status);
		}
	});
}


let bookmarkButton = openBookmarkBar;


function bookChange() {
	if(bookmarkButton == openBookmarkBar) {
		bookmarkButton = closeBookmarkBar;
	} else if (bookmarkButton == closeBookmarkBar) {
		bookmarkButton = openBookmarkBar;
	}
}

function openBookmarkBar(path) {
	if($('#bookmarkBar').html() != '') {
		$('#bookmarkBar').css('right', '0px');
		$('#bookmarkBar').css('opacity', '1');
    	bookChange();
		return;
	}
	
	$.ajax({
        url: `${path}/bookmark`,
        type: "post",
        cache: false,
        dataType: "json",
        beforeSend: () => {
        	$('#bookmarkBar').html('');
        	$('#bookmarkBar').css('right', '0px');
    		$('#bookmarkBar').css('opacity', '1');
        },
        success: (data) => {
        	console.log(data);
			if (data.check == "fail" || data.list.length <= 0) {
				alert('북마크를 불러오는데 실패하였습니다.');
				console.error('북마크를 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
        	$.each (data.list, function (index, el) {
                $(`#bookmarkBar`).append(returnBookmarString(el, path));
            });
        },
        error: (xhr) => {
        	alert('북마크를 불러오는데 실패하였습니다.');
        	console.error(xhr.status);
        },
        complete: () => {
        	bookChange();
        }
    });
	
}

function closeBookmarkBar(path) {
	$('#bookmarkBar').css('right', '-500px');
	$('#bookmarkBar').css('opacity', '0');
	bookChange();
}

function alwaysCloseBookmark() {
	$('#bookmarkBar').css('right', '-500px');
	$('#bookmarkBar').css('opacity', '0');
	bookmarkButton = openBookmarkBar;
}


function returnBookmarString(book, path) {
	let str = `<div class="userbookmark"><div class="bookmarkImage" onclick="window.open('${path}/country/${book.countryNumber}/area/${book.areaNumber}', '_blank')">
	<img src="${path}/image/area/${book.countryName}_${book.englishName}.jpg" alt=""></div>
    <div class="bookmarkName">${book.koreanName}</div><div class="bookmarkDel">
    <input type="button" value="북마크삭제"></div></div>`;
	return str;
}