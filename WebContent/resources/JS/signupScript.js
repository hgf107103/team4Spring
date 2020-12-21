let idCheckBool = false;
let pwdCheckBool = false;
let nameCheckBool = false;
let nickCheckBool = false;
let signUserInfo = {
		id:"",
		pwd:"",
		name:"",
		nick:""
};
let path;

function regExpPwd(str) {
    const pwdReg = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,15}$', 'g');
    return pwdReg.test(str);
}

function regExpId(str) {
    const idReg = new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,15}$', 'g');
    return idReg.test(str);
}

function regExpNickName(str) {
    const idReg = new RegExp('(?!^[0-0]*$)^([가-힣||ㄱ-ㅎ||ㅏ-ㅣ||a-z||A-Z||0-9||あ-ん||?~!@#%^&*]{4,15})$', 'g');
    return idReg.test(str);
}

function regExpName(str) {
    const idReg = new RegExp('(?!^[0-9]*$)^([가-힣]{1,8})$', 'g');
    return idReg.test(str);
}

function idCheck() {
	
	$('#IDLog').text('서버와 통신중입니다.');
	
    if ($('#signupID').val() == '') {
    	$('#IDLog').text('아이디를 입력해주십시오');
    	$('#IDLog').css('color', 'rgb(255,50,50)');
    	idCheckBool = false;
        return;
    }
    if (!regExpId($('#signupID').val())) {
    	$('#IDLog').text('잘못된 아이디입니다.\n아이디는 영어와 숫자로만 작성해야 하며 6자리 이상 15자리 이하로 만들어야 합니다.');
    	$('#IDLog').css('color', 'rgb(255,50,50)');
    	idCheckBool = false;
        return;
    }
    
    $.ajax({
		url: `signup/idcheck`,
		type: "post",
		cache: false,
		data: {
			userID:$('#signupID').val()
		},
		dataType: "json",
		success: (data) => {
			if(data.check != "success") {
				alert('아이디 체크에 실패하였습니다.');
				console.error(data.error);
				return;
			}
			if(data.result == true) {
				$('#signupIDCheck').val('확인완료');
			    $('#signupIDCheck').attr('disabled', true);
			    $('#signupID').attr('disabled', true);
			    $('#signupID').css('background-color', 'rgba(100,100,100,0.6)');
		    	$('#IDLog').text('아이디가 확인되었습니다.');
		    	$('#IDLog').css('color', 'rgb(50,50,255)');
			    idCheckBool = true;
			    $('#signupPWD').focus();
			    signUserInfo.id = $('#signupID').val();
			    return;
			}
			$('#IDLog').text('존재하는 아이디입니다.');
	    	$('#IDLog').css('color', 'rgb(255,50,50)');
	    	idCheckBool = false;
	    	return;
		},
		error: (xhr) => {
			alert('아이디 체크에 실패하였습니다.');
			console.error(xhr.status);
			idCheckBool = false;
		}
	});
}

function pwdCheck() {
    if ($('#signupPWD').val() == '') {
        $('#PWDLog').text('비밀번호를 입력해주십시오');
        $('#PWDLog').css('color', 'rgb(0,0,0)')
        pwdCheckBool = false;
    	pwdCheckCheck();
        return;
    }
    if (!regExpPwd($('#signupPWD').val())) {
        $('#PWDLog').text('비밀번호는 6자리 이상 15자리 이하이며, 영어와 숫자로 만들어야 하며, 한개 이상의 특수문자가 반드시 필요합니다.');
        $('#PWDLog').css('color', 'rgb(255,50,50)');
        pwdCheckBool = false;
    	pwdCheckCheck();
        return;
    }
    if(regExpPwd($('#signupPWD').val())) {
    	$('#PWDLog').text('올바른 형태의 비밀번호입니다.');
    	$('#PWDLog').css('color', 'rgb(50,50,255)');
    	pwdCheckBool = false;
    	pwdCheckCheck();
    	return;
    }
}

function pwdCheckCheck() {
	if ($('#signupPWDCheck').val() == '') {
		$('#PWDCheckLog').text('비밀번호를 한번 더 입력해주십시오.');
		$('#PWDCheckLog').css('color', 'rgb(0,0,0)');
		pwdCheckBool = false;
		return;
	}
    if ($('#signupPWD').val() != $('#signupPWDCheck').val()) {
        $('#PWDCheckLog').text('비밀번호가 다릅니다.');
        $('#PWDCheckLog').css('color', 'rgb(255,50,50)');
        pwdCheckBool = false;
		return;
    }
    if($('#signupPWD').val() == $('#signupPWDCheck').val()) {
        $('#PWDCheckLog').text('비밀번호가 같습니다.');
        $('#PWDCheckLog').css('color', 'rgb(50,50,255)');
        pwdCheckBool = true;
        signUserInfo.pwd = $('#signupPWDCheck').val();
		return;
    }
}

function nameCheck() {
    if ($('#signupName').val() == '') {
        $('#nameLog').text('이름을 입력해주십시오');
        $('#nameLog').css('color', 'rgb(255,50,50)');
        nameCheckBool = false;
        return;
    }
    if (!regExpName($('#signupName').val())) {
        $('#nameLog').text('올바르지 않은 이름입니다. 이름은 한글로만 작성할 수 있습니다.');
        $('#nameLog').css('color', 'rgb(255,50,50)');
        nameCheckBool = false;
        return;
    }
    if ($('#signupName').val() != '' && regExpName($('#signupName').val())) {
        $('#nameLog').text('올바른 이름입니다.');
        $('#nameLog').css('color', 'rgb(50,50,255)');
        nameCheckBool = true;
        signUserInfo.name = $('#signupName').val();
        return
    }
}

function nickCheck() {
    if ($('#signupNick').val() == '') {
    	$('#nickLog').text('별명을 입력해주십시오');
    	$('#nickLog').css('color', 'rgb(0,0,0)');
        nickCheckBool = false;
        return;
    }
    if (!regExpNickName($('#signupNick').val())) {
    	$('#nickLog').text('잘못된 별명입니다.\n별명은 4자리 이상 15자리 이하로 작성해야 하며, 일부 특수문자가 불가능합니다.')
        $('#nickLog').css('color', 'rgb(255,50,50)');
        nickCheckBool = false;
        return;
    }
    
    $.ajax({
		url: `signup/nickcheck`,
		type: "post",
		cache: false,
		data: {
			userNickname:$('#signupNick').val()
		},
		dataType: "json",
		success: (data) => {
			if(data.check != "success") {
				alert('별명 체크에 실패하였습니다.');
				console.error(data.error);
				return;
			}
			if(data.result == true) {
				$('#signupNickCheck').val('확인완료');
			    $('#signupNickCheck').attr('disabled', true);
			    $('#signupNick').attr('disabled', true);
			    $('#signupNick').css('background-color', 'rgba(100,100,100,0.6)');
		    	$('#nickLog').text('별명이 확인되었습니다.');
		    	$('#nickLog').css('color', 'rgb(50,50,255)');
			    signUserInfo.nick = $('#signupNick').val();
			    nickCheckBool = true;
			    return;
			}
			$('#nickLog').text('존재하는 별명입니다.');
	    	$('#nickLog').css('color', 'rgb(255,50,50)');
	    	nickCheckBool = false;
	    	return;
		},
		error: (xhr) => {
			alert('별명 체크에 실패하였습니다.');
			console.error(xhr.status);
			idCheckBool = false;
		}
	});
}




function userSignupSubmit() {
	path = $('#path').attr('content');
	if(idCheckBool && regExpId($('#signupID').val()) && $('#signupID').val() == signUserInfo.id) {
		if(pwdCheckBool && regExpPwd($('#signupPWD').val()) && regExpPwd($('#signupPWDCheck').val()) && $('#signupPWD').val() == $('#signupPWDCheck').val() && $('#signupPWDCheck').val() == signUserInfo.pwd) {
			if(nameCheckBool && regExpName($('#signupName').val()) && signUserInfo.name == $('#signupName').val()) {
				if(nickCheckBool && regExpNickName($('#signupNick').val()) && signUserInfo.nick == $('#signupNick').val()) {
					
					if($("#g-recaptcha-response").val() == '') {
						alert('회원가입 진행 전에 캡차인증을 해주십시오');
						return;
					}
					
					$('.signupInputText').attr('disabled', true);
					$('.signupInputButton').attr('disabled', true);
					$.ajax({
						url: `signup`,
						type: "post",
						cache: false,
						data: {
							userID:signUserInfo.id,
							userPassword:signUserInfo.pwd,
							userName:signUserInfo.name,
							userNickname:signUserInfo.nick,
							recode:$("#g-recaptcha-response").val()
						},
						dataType: "json",
						beforeSend: () => {
							$('body').css('overflow', 'hidden');
							$('body').css('touch-action', 'none');
							$('body').append(returnLoadBox());
						},
						success: (data) => {
							if(data.result == "denaiCode") {
								alert('캡차인증에 실패하였습니다.');
							}
							if(data.check != "success") {
								alert('회원가입에 실패하였습니다.');
								console.error(data.error);
							}
							if(data.result == true) {
								alert('회원가입에 성공하였습니다.');
								location.href=`${path}`;
								return;
							}
							console.log(data);
						},
						error: (xhr) => {
							alert('회원가입에 실패하였습니다.');
							console.error(xhr.status);
							return;
						},
						complete: () => {
							$('body').css('overflow', 'auto');
							$('body').css('touch-action', 'auto');
							$('#loadBox').detach();
						}
					});
					return;
				}
				alert('별명에 문제가 있습니다.');
				return;
			}
			alert('이름에 문제가 있습니다.');
			return;
		}
		alert('비밀번호에 문제가 있습니다.')
		return;
	}
	alert('아이디에 문제가 있습니다.')
	return;
}


function returnLoadBox() {
	let str = `<div id="loadBox"><img id="loadImage" src="${path}/image/sys/loading.gif"><p id="loadLog">세계로 여행을 떠날 채비를 하는중..</p></div>`;
	return str;
}