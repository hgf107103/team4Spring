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

function openBookmarkBar() {
	if($('#userBookMark').val() == "북마크열기") {
		
		$('#bookmarkBar').css('right', '0px');
		$('#bookmarkBar').css('opacity', '1');
		$('#userBookMark').val('북마크접기');
		
	} else if($('#userBookMark').val() != "북마크열기") {
		
		$('#bookmarkBar').css('right', '-500px');
		$('#bookmarkBar').css('opacity', '0');
		$('#userBookMark').val('북마크열기');
		
	}
}


function alwaysCloseBookmark() {
	$('#bookmarkBar').css('right', '-500px');
	$('#bookmarkBar').css('opacity', '0');
	$('#userBookMark').val('북마크열기');
}