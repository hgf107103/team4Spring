let list = ['대한민국','일본','미국','캐나다','호주','러시아','영국','이탈리아','프랑스'];
let city = new Array();

class cityObject {
    constructor(country, city) {
        this.country = country;
        this.city = city;
    }
}

city.push(new cityObject("대한민국","서울"));
city.push(new cityObject("대한민국","부산"));
city.push(new cityObject("일본","도쿄"));
city.push(new cityObject("일본","오사카"));
city.push(new cityObject("미국","샌프란시스코"));
city.push(new cityObject("미국","뉴욕"));
city.push(new cityObject("캐나다","오타와"));
city.push(new cityObject("캐나다","벤쿠버"));

let idCheckBool = false;
let pwdCheckBool = false;
let nameCheckBool = false;
let nickCheckBool = false;

function regExpPwd(str) {
    const pwdReg = new RegExp('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z!@#$%^&*()_+=?0-9]{6,15})([!@#$%^&*()_+=<>?]+)$', 'gm');
    return pwdReg.test(str);
}

function regExpId(str) {
    const idReg = new RegExp('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$', 'gm');
    return idReg.test(str);
}

function regExpNickName(str) {
    const idReg = new RegExp('(?!^[0-0]*$)^([가-힣||ㄱ-ㅎ||ㅏ-ㅣ||a-z||A-Z||0-9||あ-ん||?~!@#$%^&*]{1,15})$', 'gm');
    return idReg.test(str);
}

function regExpName(str) {
    const idReg = new RegExp('(?!^[0-9]*$)^([가-힣]{0,6})$', 'gm');
    return idReg.test(str);
}

//로그인 관련
let readyCheck = 0;
function loginReady() {
    if(readyCheck == 1) {
        $('.loginInputScript').attr('disabled', true);
        $('.loginInputScript').css('right', '-300px');
        $('.loginInputScript').css('opacity', '0');
        readyCheck = 0;
        return;
    }
    $('.loginInputScript').attr('disabled', false);
    $('.loginInputScript').css('right', '30px');
    $('.loginInputScript').css('opacity', '1');
    readyCheck = 1;
}
//로그인 관련

//회원가입 관련
let signupShowCheck = false;
function signupOnoff() {
    if (signupShowCheck == false) {
        $('#signupDiv').css('top', '0%');
        $('#signupDiv').css('opacity', '1');
        signupShowCheck = true;
        signupDOMShow('signupIDSection');
        return;
    }
    if($('.signupInput').val() != '') {
        let check = confirm('입력된 값이 있습니다.\n정말로 창을 닫으시겠습니까?');
        if(!check) {
            alert('취소되었습니다.');
            return;
        }
    }
    $('.signupInput').val('');
    $('#signupDiv').css('top', '-100%');
    $('#signupDiv').css('opacity', '0.3');

    signupDOMdisable('signupIDSection');
    signupDOMdisable('signupPWDSection');
    signupDOMdisable('signupNameSection');
    signupDOMdisable('signupSubmitSection');

    $('#signupID').css('background-color', 'rgba(230,230,230,0)');
    $('#signupNick').css('background-color', 'rgba(230,230,230,0)');

    $('#signupPWDLog').text('비밀번호를 입력해주십시오');
    $('#signupPWDLog').css('color', 'rgb(255,255,255)');

    
    $('#signupNameLog').text('이름을 입력해주십시오');
    $('#signupNameLog').css('color', 'rgb(255,255,255)')

    idCheckBool = false;
    pwdCheckBool = false;
    nameCheckBool = false;
    nickCheckBool = false;
    signupShowCheck = false;
}

function idCheck() {
    if ($('#signupID').val() == '') {
        alert('아이디를 입력해주십시오');
        idCheckBool = false;
        return;
    }
    if (!regExpId($('#signupID').val())) {
        alert('잘못된 아이디입니다.\n아이디는 영어와 숫자로만 작성해야 하며 6자리 이상 15자리 이하로 만들어야 합니다.');
        idCheckBool = false;
        return;
    }
    $('#signupIDCheck').val('확인완료');
    $('#signupIDCheck').attr('disabled', true);
    $('#signupID').attr('readonly', true);
    $('#signupID').css('background-color', 'rgba(100,100,100,0.6)');
    idCheckBool = true;
    signupDOMShow('signupPWDSection');
    $('#signupPWD').focus();
}

function pwdCheck() {
    if ($('#signupPWD').val() == '') {
        $('#signupPWDLog').text('비밀번호를 입력해주십시오');
        $('#signupPWDLog').css('color', 'rgb(255,50,50)')
        signupDOMdisable('signupNameSection');
        pwdCheckBool = false;
        return;
    }
    if (!regExpPwd($('#signupPWD').val())) {
        $('#signupPWDLog').text('비밀번호는 6자리 이상 15자리 이하이며, 영어와 숫자로 만들어야 하며, 한개 이상의 특수문자가 반드시 필요합니다.');
        $('#signupPWDLog').css('color', 'rgb(255,50,50)');
        signupDOMdisable('signupNameSection');
        pwdCheckBool = false;
        return;
    }
    if ($('#signupPWD').val() != $('#signupPWDCheck').val() && regExpPwd($('#signupPWD').val())) {
        $('#signupPWDLog').text('비밀번호가 다릅니다.');
        $('#signupPWDLog').css('color', 'rgb(255,50,50)');
        signupDOMdisable('signupNameSection');
        pwdCheckBool = false;
        return;
    }
    if($('#signupPWD').val() == $('#signupPWDCheck').val()) {
        $('#signupPWDLog').text('비밀번호가 확인되었습니다.');
        $('#signupPWDLog').css('color', 'rgb(50,50,255)');
        signupDOMShow('signupNameSection');
        pwdCheckBool = true;
        return
    }
}

function nameCheck() {
    if ($('#signupName').val() == '') {
        $('#signupNameLog').text('이름을 입력해주십시오');
        $('#signupNameLog').css('color', 'rgb(255,50,50)');
        nameCheckBool = false;
        return;
    }
    if (!regExpName($('#signupName').val())) {
        $('#signupNameLog').text('올바르지 않은 이름입니다.');
        $('#signupNameLog').css('color', 'rgb(255,50,50)');
        nameCheckBool = false;
        return;
    }
    if($('#signupName').val() != '' && regExpName($('#signupName').val())) {
        $('#signupNameLog').text('이름이 확인되었습니다.');
        $('#signupNameLog').css('color', 'rgb(50,50,255)');
        nameCheckBool = true;
        return
    }
}

function nickCheck() {
    if ($('#signupNick').val() == '') {
        alert('별명을 입력해주십시오');
        nickCheckBool = false;
        return;
    }
    if (!regExpNickName($('#signupNick').val())) {
        alert('잘못된 별명입니다.\n별명은 1자리 이상 15자리 이하로 지을 수 있으며 숫자, 영어, 한글, 일본어, 특수문자가 들어갈 수 있습니다.')
        nickCheckBool = false;
        return;
    }
    $('#signupNickCheck').val('확인완료');
    $('#signupNickCheck').attr('disabled', true);
    $('#signupNick').attr('readonly', true);
    $('#signupNick').css('background-color', 'rgba(100,100,100,0.6)');
    signupDOMShow('signupSubmitSection');
    nickCheckBool = true;
}


function signup() {
    if (idCheckBool) {
        if (pwdCheckBool) {
            if (nameCheckBool) {
                if (nickCheckBool) {
                    alert('회원가입에 성공했습니다.');
                    location.reload();
                    return;
                }
                alert('별명에 오류가 발생했습니다.');
                return;
            }
            alert('이름에 오류가 발생했습니다.');
            return;
        }
        alert('패스워드에 오류가 발생했습니다.');
        return;
    }
    alert('ID에 오류가 발생했습니다.');
    return;
}




function signupDOMShow(domname) {
    $(`#${domname} input`).attr('disabled', false);
    $(`#${domname} input`).attr('readonly', false);
    $(`#${domname}`).css('opacity', '1');
}
function signupDOMdisable(domname) {
    $(`#${domname} input`).attr('disabled', true);
    $(`#${domname}`).css('opacity', '0');
}
//회원가입 관련

//북마크 관련
function lookBookmark() {
    
    $('#userBookmark').css('right', '0px');
    $('#myBookmark').css('opacity', '0');
    //$('#mainContents').css('display', 'none');
}

function outBookmark() {
    if($('#userBookmark').css('right') != '-500px') {
        $('#userBookmark').css('right', '-500px');
        $('#myBookmark').css('opacity', '1');
        $('#mainContents').css('display', 'flex');
    }
}
//북마크 관련

//검색관련
function searchKeyupStyle() {
    if ($('#searchText').val() == '') {
        $('#searchList').css('opacity', '0');
        $('#searchList').css('height', '0vh'); 
        return;
    }
    $('#searchList').css('opacity', '1');
    $('#searchList').css('height', '65vh'); 
}

function goSearch() {
    searchKeyupStyle();
    if($('#searchText').val() == '') {
        return;
    }
    let reg = searchFunction();
    let str = "대한민국";

    //$('#searchList').html(`<h2 id="noList">검색결과</h2>`);
    $('#searchList').append(`<span id="noList">${$('#searchText').val()}</span> 에 대한 검색내역이 없습니다.`);
    
    let check = 0;
    $.each (list, function (index, el) {
        if (reg.test(el)) {
            if (check == 0) {
                $('#searchList').html(``);
                check = 1;
            }

            $('#searchList').append(returnListTableString(el));
        }
    });
    
    $.each (city, (index, el) => {
        if (reg.test(el.city)) {
            if (check == 0) {
                $('#searchList').html(``);
                check = 1;
            }
            $('#searchList').append(returnListCityString(el));
        }
    });
}

function searchKeyup() {
    if (window.event.keyCode == 13) {
        goSearch();
    }
}


function searchFunction() {
    const reg = new RegExp(`(${$('#searchText').val()})+`, 'gm');
    return reg;
}


function returnListTableString(listObject) {
    let str = `<table class="listTable">
            <tr><td rowspan="2" class="listImgTd"><img src="img/bookmarkImg/bookmark01.jpg" alt=""></td>
            <td class="listCountryTd">${listObject}</td></tr>
            <tr><td class="listRedirectTd"><span onclick="window.open('country.html', '_blank')">바로가기</span></td></tr></table>`;
    return str;
}
function returnListCityString(listObject) {
    let str = `<table class="listTable">
            <tr><td rowspan="2" class="listImgTd"><img src="img/bookmarkImg/bookmark01.jpg" alt=""></td>
            <td class="listCountryTd">${listObject.country} ${listObject.city}</td></tr>
            <tr><td class="listRedirectTd"><span onclick="window.open('city.html', '_blank')">바로가기</span></td></tr></table>`;
    return str;
}
//검색관련