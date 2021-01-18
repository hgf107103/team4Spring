let userName;
let userID;
let server;
let websocket;

async function getCountry() {
    let path = $('#path').attr('content');
    let country = await axios({
        method: 'post',
        url: `${path}/country/list`
    });

    if (country.status == 200 && country.data.check === "success") {
        country.data.list.forEach((val, index) => {
            $(`#serverlist`).append(`<option value="${val.englishName}">${val.koreanName}</option>`);
        })
    }
}

function connect(id, name, url){
    userID = id;
    userName = name;
    server = $("#serverlist option:selected").val();

    if(server == "null") {
        alert('서버를 선택해주십시오');
        return;
    }

    $('#title').css('display', 'block');
    $('#chatLog').css('display', 'block');
    $('#write').css('display', 'flex');
    $('#ready').css('display', 'none');
    
    $('#title').text(`${$("#serverlist option:selected").text()} 채팅방`);
    console.log('입장');

    websocket = new WebSocket(`ws://${url}/chat-ws`);
    //웹 소켓에 이벤트가 발생했을 때 호출될 함수 등록
    websocket.onopen = onOpen;
    websocket.onmessage = onMessage;
    websocket.onclose = onClose;
}

function onOpen(){
    websocket.send(`${userID}:${server}:${userName}님이 참가하셨습니다.`);
}
//웹 소켓에서 연결이 해제 되었을 때 호출될 함수

function onMessage(evt){
    data= evt.data;
    let text = data.split('*');
    if (text[1] == undefined) {
        $('#chatLog').append(`<div class="messageBox"><p class="syslog id">시스템</p><p class="message">${text[0]}</p></div>`);
        return;
    }
    let check = 'log';
    if (text[0] == userName) {
        check = 'mylog';
    }
    $('#chatLog').append(`<div class="messageBox"><p class="${check} id">${text[0]}</p><p class="message">${text[1]}</p></div>`);
}

function onClose(){
}

 
function send(){
    let myWrite = $('#writeChat').val();
    let message = myWrite.replace(/([<|>$%&#*:;])/gm, " ");
    websocket.send(`${userID}:${server}:${userName}*${message}`);
    $('#writeChat').val('');
}

function exit() {
    websocket.send(`${userID}:${server}:${userName}님이 퇴장하셨습니다.`);
    websocket.close();

    userID = null;
    userName = null;
    server = null;

    $('#title').css('display', 'none');
    $('#chatLog').html('');
    $('#chatLog').css('display', 'none');
    $('#write').css('display', 'none');
    $('#ready').css('display', 'flex');

}