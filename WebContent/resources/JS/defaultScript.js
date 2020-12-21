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
				$('#loginID').val('');
				return;
			}
			if(data.result == "pwdworng" && data.check == "success") {
				alert('비밀번호가 다릅니다.');
				$('#loginPWD').val('');
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
			$('#loginID').val('');
			$('#loginPWD').val('');
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
			if (data.check == "fail") {
				alert('북마크를 불러오는데 실패하였습니다.');
				console.error('북마크를 불러오는데 실패하였습니다.');
				console.error("에러코드 : ", data.error);
				return;
			}
			if (data.list.length <= 0) {
				$(`#bookmarkBar`).append('<h4 id="bookmarkEmpty">북마크가 비어있습니다.</h4>');
				return;
			}
        	$.each (data.list, function (index, el) {
                $(`#bookmarkBar`).append(returnBookmarString(el, path));
            });
        },
        error: (xhr) => {
        	console.log();
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
    <input type="button" value="북마크삭제" onclick="defaultRemoveBookmark('${path}', ${book.areaNumber})"></div></div>`;
	return str;
}



function defaultRemoveBookmark(path, number) {
	$.ajax({
		url: `${path}/bookmark/remove`,
		type: "post",
		data: {
			areaNumber:number
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
		},
		complete: () => {
			$('#bookmarkBar').html('');
			openBookmarkBar(path);
			bookmarkButton = closeBookmarkBar;
		}
	});
}